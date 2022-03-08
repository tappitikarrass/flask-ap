from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import (jwt_required, create_access_token, get_jwt_identity)

from models import (User)
from schemas import (UserSchema)
from .db_utils import (get_entries, get_entry_by_id, get_entry_by_username)
from .db_utils import (post_entry)
from .db_utils import (delete_entry_by_id)
from .db_utils import (update_entry_by_id)
from .db_utils import (generate_password_hash, bcrypt)

bp_user = Blueprint(name="bp_user", import_name=__name__)

@bp_user.route("/login", methods=["POST"])
def login():
    try:
        auth = request.authorization
        username = auth.username
        password = auth.password
        user = get_entry_by_username(User, UserSchema, username)
        pwd_hash = user.json.get("password", None)
        pwd_status = bcrypt.check_password_hash(pwd_hash, password)
    except Exception:
        return jsonify(400), 400
    if not pwd_status:
        return jsonify(401), 401
    else:
        token = create_access_token(identity=username)
        return jsonify(token=token), 200

@bp_user.route("/user", methods=["GET", "POST"])
def user():
    if request.method == "GET":
        return get_entries(User, UserSchema), 200
    if request.method == "POST":
        try:
            user_data = generate_password_hash(request.get_json())
            return post_entry(User, UserSchema, **user_data), 200
        except Exception as e:
            return jsonify(400), 400

@bp_user.route("/user/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def user_by_id(id):
    cur_indentity = get_jwt_identity()
    try:
        user = get_entry_by_id(User, UserSchema, id)
        username = user.json.get("username", None)
    except Exception as e:
        return jsonify(400), 400

    if username == cur_indentity:
        if request.method == "GET":
            return user, 200
        if request.method == "PUT":
            user_data = generate_password_hash(request.get_json())
            return update_entry_by_id(User, UserSchema, id, **user_data), 200
        if request.method == "DELETE":
            return delete_entry_by_id(User, UserSchema, id), 200
    return jsonify(403), 403

@bp_user.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify(200), 200
