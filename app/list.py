from flask import (Blueprint, request, jsonify)
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from .db_utils import (
    get_entries,
    get_entry_by_id,
    get_entry_by_username,
    post_entry,
    update_entry_by_id,
    delete_entry_by_id,
)
from .models import (User, List, ListAnime, TokenBlocklist)
from .schemas import (UserSchema, ListSchema, ListAnimeSchema)
from . import (jwt, db)

bp_list = Blueprint(name="bp_list", import_name=__name__)

@bp_user.route("/list", methods=["GET", "POST"])
def list():
    if request.method == "GET":
        return get_entries(List, ListSchema), 200
    if request.method == "POST":
        try:
            list_data = ListSchema.load(request.get_json())
            return post_entry(User, UserSchema, **list_data), 200
        except Exception as e:
            return jsonify(400), 400

@bp_user.route("/list/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def list_by_id(id):
    cur_indentity = get_jwt_identity()
    list = get_entry_by_id(List, ListSchema, id)
    if list == None:
        return jsonify(404), 404
    username = user.json.get("username", None)

    if username == cur_indentity:
        if request.method == "GET":
            return user, 200
        if request.method == "PUT":
            user_data = generate_password_hash(request.get_json())
            return update_entry_by_id(User, UserSchema, id, **user_data), 200
        if request.method == "DELETE":
            return delete_entry_by_id(User, UserSchema, id), 200
    return jsonify(403), 403
