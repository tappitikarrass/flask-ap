from functools import wraps
from models import session
from flask import jsonify
from models import session

def session_lifecycle(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            res = func(*args, **kwargs)
            session.commit()
            return res
        except Exception as e:
            session.rollback()
            raise e
    return wrapper

@session_lifecycle
def post_entry(model_class, model_schema, **kwargs):
    entry = model_class(**kwargs)
    session.add(entry)
    return jsonify(model_schema().dump(entry))

@session_lifecycle
def get_entries(model_class, model_schema):
    entries = session.query(model_class).all()
    return jsonify(model_schema(many=True).dump(entries))

@session_lifecycle
def get_entry_by_id(model_class, model_schema, id):
    entry = session.query(model_class).filter_by(id=id).first()
    if entry is None:
        raise InvalidUsage("Object not found", status_code=404)
    return jsonify(model_schema().dump(entry))

@session_lifecycle
def get_entry_by_username(model_class, model_schema, username):
    entry = session.query(model_class).filter_by(username=username).first()
    if entry is None:
        raise InvalidUsage("Object not found", status_code=404)
    return jsonify(model_schema().dump(entry))
