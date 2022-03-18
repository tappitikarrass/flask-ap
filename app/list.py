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

@bp_list.route("/list/<username>", methods=["GET"])
@jwt_required()
def get_lists_by_username(username):
    cur_indentity = get_jwt_identity()
    if username != cur_indentity:
        return jsonify(403), 403
    user = get_entry_by_username(User, UserSchema, username)
    user_id = user.json.get("user_id", None)

    user_lists = db.session.query(List).filter_by(user_id=user_id).all()
    return jsonify(ListSchema(many=True).dump(user_lists)), 200

@bp_list.route("/list", methods=["POST"])
@jwt_required()
def post_list():
    cur_indentity = get_jwt_identity()
    try:
        request_data = request.get_json()
        user_id = request_data["user_id"]
        user = get_entry_by_id(User, UserSchema, user_id)
        username = user.json.get("username", None)
        if username != cur_indentity:
            return jsonify(403), 403

        list_data = ListSchema().load(request_data)
        user_lists = db.session.query(List).filter_by(user_id=user_id).all()
        for i in range(len(user_lists)):
            if request_data["name"] == user_lists[i].name:
                raise Exception
        return post_entry(List, ListSchema, **list_data), 200
    except Exception as e:
        return jsonify(400), 400

@bp_list.route("/list/<username>/<int:list_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def list_by_id(username, list_id):
    cur_indentity = get_jwt_identity()
    list = get_entry_by_id(List, ListSchema, list_id)
    user = get_entry_by_username(User, UserSchema, username)

    if username != cur_indentity:
        return jsonify(403), 403
    if list == None:
        return jsonify(404), 404
    user_id = user.json.get("user_id", None)

    if request.method == "GET":
        return list, 200
    if request.method == "PUT":
        list_data = ListSchema().load(request.get_json())
        return update_entry_by_id(List, ListSchema, list_id, **list_data), 200
    if request.method == "DELETE":
        return delete_entry_by_id(List, ListSchema, list_id), 200
