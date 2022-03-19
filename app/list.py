from flask import (Blueprint, request, jsonify)
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from mal import (Anime)
from .db_utils import (
    get_entries,
    entry_by_id,

    get_json_field,
    get_user,
    get_admin,
    check_access,
)
from .models import (User, List, ListAnime, TokenBlocklist)
from .schemas import (UserSchema, ListSchema, ListAnimeSchema)
from . import (jwt, db)

bp_list = Blueprint(name="bp_list", import_name=__name__)

@bp_list.route("/list/<username>", methods=["GET"])
@jwt_required()
def get_lists_by_username(username):
    cur_indentity = get_jwt_identity()
    user = get_user(cur_indentity)
    if user is None:
        return jsonify(404), 404
    user_id = get_json_field(user, "user_id")
    admin = get_admin(user_id)
    if not check_access(cur_indentity, username, admin):
        return jsonify(403), 403

    user_lists = get_entries(List)
    return user_lists, 200

@bp_list.route("/list", methods=["POST"])
@jwt_required()
def post_list():
    cur_indentity = get_jwt_identity()
    cur_user = get_user(cur_indentity)
    admin = get_admin(get_json_field(cur_user, "user_id"))

    request_data = request.get_json()
    user_id = request_data["user_id"]
    user = entry_by_id("get", User, user_id)
    username = get_json_field(user, "username")
    print(admin, username, cur_indentity)
    print(check_access(cur_indentity, username, admin))

    if not check_access(cur_indentity, username, admin):
        return jsonify(403), 403

    list_data = ListSchema().load(request_data)
    user_lists = db.session.query(List).filter_by(user_id=user_id).all()
    for i in range(len(user_lists)):
        if request_data["name"] == user_lists[i].name:
            return jsonify(400), 400

    return entry_by_id("post", List, 0, **list_data), 200

@bp_list.route("/list/<username>/<int:list_id>", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def list_by_id(username, list_id):
    cur_indentity = get_jwt_identity()
    list = entry_by_id("get", List, list_id)
    if list == None:
        return jsonify(404), 404

    user = get_user(username)
    user_id = get_json_field(user, "user_id")
    cur_user = get_user(cur_indentity)
    cur_user_id =  get_json_field(cur_user, "user_id")
    admin = get_admin(cur_user_id)
    if not check_access(cur_indentity, username, admin):
        return jsonify(403), 403

    if request.method == "POST":
        request_data = request.get_json()
        anime_data = ListAnimeSchema().load(request_data)
        list_animes = db.session.query(ListAnime).filter_by(list_id=list_id).all()
        for i in range(len(list_animes)):
            if request_data["mal_id"] == list_animes[i].mal_id:
                return jsonify(400), 400
        return entry_by_id("post", ListAnime, 0, **anime_data), 200
    if request.method == "GET":
        return list, 200
    if request.method == "PUT":
        list_data = ListSchema().load(request.get_json())
        return entry_by_id("put", ListAnime, 0, **list_data), 200
    if request.method == "DELETE":
        return entry_by_id("delete", ListAnime, list_id), 200

@bp_list.route("/list/<username>/<int:list_id>/<int:mal_id>", methods=["DELETE"])
@jwt_required()
def list_delete_entry(username, list_id, mal_id):
    cur_indentity = get_jwt_identity()
    cur_user = get_user(cur_indentity)
    cur_user_id = get_json_field(cur_user, "user_id")

    user = get_user(username)
    user_id = get_json_field(user, "user_id")
    admin = get_admin(cur_user_id)
    if not check_access(cur_indentity, username, admin):
        return jsonify(403), 403

    list = entry_by_id("get", List, list_id)
    list_user_id = get_json_field(list, "user_id")
    if list_user_id != user_id:
        return jsonify(404), 404

    list_animes = db.session.query(ListAnime).filter_by(list_id=list_id).all()
    for i in range(len(list_animes)):
        print(list_animes[i].mal_id)
        if list_animes[i].mal_id == mal_id and list_animes[i].list_id == list_id:
            entry = db.session.query(ListAnime).filter_by(list_id=list_id, mal_id=mal_id).first()
            db.session.delete(entry)
            db.session.commit()
            return jsonify(ListAnimeSchema().dump(entry)), 200
    return jsonify(404), 404
