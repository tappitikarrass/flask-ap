from datetime import (datetime, timezone, timedelta)
from flask import (Blueprint, request, jsonify)
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity,
    get_jwt
)
from .db_utils import (
    get_entries,
    get_entry_by_id,
    get_entry_by_username,
    post_entry,
    update_entry_by_id,
    delete_entry_by_id
    generate_password_hash
)
from .models import (User, TokenBlocklist)
from .schemas import (UserSchema)
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

    user = get_entry_by_username(User, UserSchema, username)
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
    user = get_entry_by_id(User, UserSchema, id)
    if user == None:
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
