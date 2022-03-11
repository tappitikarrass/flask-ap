from flask import (Blueprint, request, jsonify)
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
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
from . import (jwt, db)
from .models import (User, List, ListAnime)
from .schemas import (UserSchema, ListSchema, ListAnimeSchema)

bp_list = Blueprint(name="bp_list", import_name=__name__)
