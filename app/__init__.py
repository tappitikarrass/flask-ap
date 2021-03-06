from flask import (Flask, request, jsonify)
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from datetime import (timedelta)
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:bePG2jqRxmRZiz@postgres/appdb"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

SWAGGER_URL = "/apidocs"
API_URL = "/static/swagger.yml"

bp_swagger_ui = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Test application"
    }
)

from .user import bp_user
from .list import bp_list
from .anime import bp_anime

app.register_blueprint(bp_swagger_ui)
app.register_blueprint(bp_user)
app.register_blueprint(bp_list)
app.register_blueprint(bp_anime)
