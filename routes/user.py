from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import (create_access_token)
from ..models import (User, UserSchema)

bp_user = Blueprint(name="bp_user", import_name=__name__)


@bp_user.route("/login", methods=["POST"])
def login():
    try:
        request_data = request.get_json()
        username = request_data["username"]
        password = request_data["password"]
    except Exception:
        return jsonify(400)

    return jsonify(200)

@bp_user.route("/user", methods=["GET", "POST", "UPDATE", "DELETE"])
def user():
    if request.method == "GET":
        return get_entries(User, UserSchema)
    pass
