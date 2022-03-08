from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import (create_access_token)
from flask_bcrypt import Bcrypt

from models import (User)
from schemas import (UserSchema)
from .db_utils import (get_entries, get_entry_by_id, get_entry_by_username)
from .db_utils import (post_entry)
from flask_jwt_extended import (jwt_required, create_access_token, get_jwt_identity)

bcrypt = Bcrypt()
bp_user = Blueprint(name="bp_user", import_name=__name__)

@bp_user.route("/login", methods=["POST"])
def login():
    try:
        request_data = request.get_json()
        username = request_data["username"]
        password = request_data["password"]
    except Exception:
        return jsonify(400), 400

    user = get_entry_by_username(User, UserSchema, username)
    pwd_hash = user.json.get("password", None)
    pwd_status = bcrypt.check_password_hash(pwd_hash, password)

    if not pwd_status:
        return jsonify(401), 401
    else:
        token = create_access_token(identity=username)
        return jsonify(token=token), 200

@bp_user.route("/user", methods=["GET"])
@jwt_required()
def user():
    current_user = get_jwt_identity()
    if request.method == "GET":
        return get_entries(User, UserSchema)
    if request.method == "POST":
        user_data = UserSchema().load(request.get_json())
        pwd = request.json.get("password", None)
        pwd_hash = bcrypt.generate_password_hash(pwd).decode("utf-8")
        user_data.update({"password": pwd_hash})
        print(pwd_hash)
        return post_entry(User, UserSchema, **user_data)
