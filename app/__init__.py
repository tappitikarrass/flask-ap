from flask import (Flask, request, jsonify)
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:bePG2jqRxmRZiz@localhost/appdb"

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

SWAGGER_URL = "/api/docs"

from .user import bp_user

app.register_blueprint(bp_user)
