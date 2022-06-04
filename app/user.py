from datetime import (datetime, timezone, timedelta)
from flask import (Blueprint, request, jsonify)
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity,
    get_jwt
)
from models.db_utils import (
    get_entries,
    entry_by_id,
    entry_by_username,
    get_user,
    get_admin,
    generate_password_hash,
    get_json_field,
    check_access
)
from models.models import (User, Admin, TokenBlocklist)
from models.schemas import (UserSchema, AdminSchema)
from . import (bcrypt, jwt, db)

bp_user = Blueprint(name="bp_user", import_name=__name__)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.token_id).filter_by(jti=jti).scalar()
    return token is not None

@bp_user.route("/login", methods=["POST"])
def login():
    try:
        auth = request.authorization
        username = auth.username
        password = auth.password
    except Exception:
        return jsonify(401), 401

    user = get_user(username)
    if user == None:
        return jsonify(404), 404
    
    pwd_hash = user.json.get("password", None)
    pwd_status = bcrypt.check_password_hash(pwd_hash, password)
    
    if not pwd_status:
        return jsonify(403), 403
    else:
        token = create_access_token(identity=username)
        return jsonify(token=token), 200

@bp_user.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify(msg="JWT revoked"), 200

@bp_user.route("/user", methods=["GET"])
@jwt_required()
def get_users():
    cur_indentity = get_jwt_identity()
    user = get_user(cur_indentity)
    admin = get_admin(get_json_field(user, "user_id"))
    if admin is None:
        return jsonify(403), 403
    return get_entries(User), 200

@bp_user.route("/user", methods=["POST"])
def post_user():
    try:
        user_data = generate_password_hash(request.get_json())
        # return entry_by_id("post", User, 0, **user_data), 200
        
        response = entry_by_id("post", User, 0, **user_data), 200
        username = get_json_field(request, "username")
        user_id = get_user(username).json.get("user_id", None)
        user_data.update({"user_id": user_id})

        return user_data
    except Exception as e:
        return jsonify(400), 400

@bp_user.route("/user/<int:user_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def user_by_id(user_id):
    user = entry_by_id("get", User, user_id)
    if user == None:
        return jsonify(404), 404

    username = get_json_field(user, "username")
    admin = get_admin(user_id)
    if not check_access(get_jwt_identity(), username, admin):
        return jsonify(403), 403

    if request.method == "GET":
        return user, 200
    if request.method == "PUT":
        user_data = generate_password_hash(request.get_json())
        return entry_by_id("put", User, user_id, **user_data), 200
    if request.method == "DELETE":
        logout()
        return entry_by_id("delete", User, user_id), 200

@bp_user.route("/user/<username>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def user_by_username(username):
    user = entry_by_username("get", username)
    if user == None:
        return jsonify(404), 404

    user_id = get_json_field(user, "user_id")
    admin = get_admin(user_id)
    if not check_access(get_jwt_identity(), username, admin):
        return jsonify(403), 403

    if request.method == "GET":
        return user, 200
    if request.method == "PUT":
        user_data = generate_password_hash(request.get_json())
        return entry_by_username("put", username, **user_data), 200
    if request.method == "DELETE":
        logout()
        return entry_by_username("delete", username), 200

