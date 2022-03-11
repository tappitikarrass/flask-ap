from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, nullable=True, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    firstname = db.Column(db.String, nullable=True, unique=False)
    lastname = db.Column(db.String, nullable=True, unique=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phone = db.Column(db.String, nullable=True, unique=True)
    password = db.Column(db.TEXT, nullable=False, unique=False)

class List(db.Model):
    list_id = db.Column(db.Integer, nullable=True, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("user.user_id"),
                        nullable=False,
                        unique=False)
    name = db.Column(db.String, nullable=False, unique=False)

class ListAnime(db.Model):
    list_id = db.Column(db.Integer,
                        db.ForeignKey("list.list_id")
                        nullable=False,
                        unique=False)
    mal_id = db.Column(db.Integer, nullable=True, unique=False)

class Admin(db.Model):
    admin_id = db.Column(db.Integer, nullable=True, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("user.user_id"),
                        nullable=False,
                        unique=True)

class TokenBlocklist(db.Model):
    token_id = db.Column(db.Integer, nullable=True, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, unique=False)
