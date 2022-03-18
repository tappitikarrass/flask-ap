from functools import wraps
from flask import jsonify, request

from .schemas import (UserSchema, ListSchema, ListAnimeSchema)
from . import (bcrypt, db)

def session_lifecycle(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            res = func(*args, **kwargs)
            db.session.commit()
            return res
        except Exception as e:
            db.session.rollback()
            raise e
    return wrapper

# POST
@session_lifecycle
def post_entry(model_class, model_schema, **kwargs):
    entry = model_class(**kwargs)
    db.session.add(entry)
    return jsonify(model_schema().dump(entry))
# GET
@session_lifecycle
def get_entries(model_class, model_schema):
    entries = db.session.query(model_class).all()
    return jsonify(model_schema(many=True).dump(entries))
@session_lifecycle
def get_entry_by_id(model_class, model_schema, id):
    if model_schema == UserSchema:
        entry = db.session.query(model_class).filter_by(user_id=id).first()
    if model_schema == ListSchema:
        entry = db.session.query(model_class).filter_by(list_id=id).first()
    if entry is None:
        return None
    return jsonify(model_schema().dump(entry))
@session_lifecycle
def get_entry_by_username(model_class, model_schema, username):
    entry = db.session.query(model_class).filter_by(username=username).first()
    if entry is None:
        return None
    return jsonify(model_schema().dump(entry))
# DELETE
@session_lifecycle
def delete_entry_by_id(model_class, model_schema, id):
    if model_schema == UserSchema:
        entry = db.session.query(model_class).filter_by(user_id=id).first()
    if model_schema == ListSchema:
        entry = db.session.query(model_class).filter_by(list_id=id).first()
    if model_schema == ListAnimeSchema:
        entry = db.session.query(model_class).filter_by(mal_id=id).first()
    if entry is None:
        return None
    db.session.delete(entry)
    return jsonify(model_schema().dump(entry))
# PUT
@session_lifecycle
def update_entry_by_id(model_class, model_schema, id, **kwargs):
    entry = db.session.query(model_class).filter_by(user_id=id).first()
    if model_schema == ListSchema:
        entry = db.session.query(model_class).filter_by(list_id=id).first()
    if entry is None:
        return None
    for key, value in kwargs.items():
        setattr(entry, key, value)
    if entry.user_id != id and entry.list_id != id:
        raise InvalidUsage("Object not found", status_code=404)
    return jsonify(model_schema().dump(entry))
# UTILS
def generate_password_hash(request_json):
    user_data = UserSchema().load(request_json)
    pwd = request.json.get("password", None)
    pwd_hash = bcrypt.generate_password_hash(pwd).decode("utf-8")
    user_data.update({"password": pwd_hash})
    return user_data
