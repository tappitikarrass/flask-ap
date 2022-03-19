from functools import wraps
from flask import jsonify, request

from .schemas import (UserSchema, ListSchema, ListAnimeSchema, AdminSchema)
from .models import (User, List, ListAnime, Admin)
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

@session_lifecycle
def get_entries(model_class):
    if model_class == User:
        model_schema = UserSchema
    if model_class == List:
        model_schema = ListSchema
    if model_class == ListAnime:
        model_schema = ListAnimeSchema
    entries = db.session.query(model_class).all()
    if entries is None:
        return None
    return jsonify(model_schema(many=True).dump(entries))

@session_lifecycle
def entry_by_id(method, model_class, id, **kwargs):
    if model_class == User:
        model_schema = UserSchema
        entry = db.session.query(model_class).filter_by(user_id=id).first()
    if model_class == List:
        model_schema = ListSchema
        entry = db.session.query(model_class).filter_by(list_id=id).first()
    if model_class == ListAnime:
        model_schema = ListAnimeSchema
        entry = db.session.query(model_class).filter_by(mal_id=id).first()
    if method == "post":
        entry = model_class(**kwargs)
        db.session.add(entry)
        return jsonify(model_schema().dump(entry))
    if entry is None:
        return None
    if method == "get":
        return jsonify(model_schema().dump(entry))
    if method == "put":
        for key, value in kwargs.items():
            setattr(entry, key, value)
        if entry.user_id != id and entry.list_id != id:
            raise InvalidUsage("Object not found", status_code=404)
        return jsonify(model_schema().dump(entry))
    if method == "delete":
        db.session.delete(entry)
        return jsonify(model_schema().dump(entry))

@session_lifecycle
def get_admin(user_id):
    entry = db.session.query(Admin).filter_by(user_id=user_id).first()
    if entry is None:
        return None
    return jsonify(UserSchema().dump(entry))
@session_lifecycle
def get_user(username):
    entry = db.session.query(User).filter_by(username=username).first()
    if entry is None:
        return None
    return jsonify(UserSchema().dump(entry))
def check_access(cur_indentity, username, admin):
    if username == cur_indentity or admin is not None:
        return True
    return False
def generate_password_hash(request_json):
    user_data = UserSchema().load(request_json)
    pwd = request.json.get("password", None)
    pwd_hash = bcrypt.generate_password_hash(pwd).decode("utf-8")
    user_data.update({"password": pwd_hash})
    return user_data
def get_json_field(json, field):
    return json.json.get(field, None)
