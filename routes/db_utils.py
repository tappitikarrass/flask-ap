from functools import wraps
from models import session
from flask import jsonify

def session_lifecycle(func):
    @wraps(func)
    def wrapper():
        try:
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
    return wrapper

@session_lifecycle
def post_entry(model_class, model_schema, **kwargs):
    pass

@session_lifecycle
def get_entries(model_class, model_schema):
    entries = session.query(model_class).all()
    return jsonify(model_schema(many=True).dump(entries))
