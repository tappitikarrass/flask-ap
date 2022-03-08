from sqlalchemy import (Column, Integer, String)
from sqlalchemy.sql.sqltypes import TEXT
from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

from flask_sqlalchemy import SQLAlchemy


# BaseModel = declarative_base()
db = SQLAlchemy()
engine = create_engine("postgresql://postgres:bePG2jqRxmRZiz@localhost/appdb")
engine.connect()
SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)
session = Session()


class User(db.Model):
    user_id = db.Column(db.Integer, nullable=True, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    firstname = db.Column(db.String, nullable=True, unique=False)
    lastname = db.Column(db.String, nullable=True, unique=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phone = db.Column(db.String, nullable=True, unique=True)
    password = db.Column(db.TEXT, nullable=False, unique=False)

class TokenBlocklist(db.Model):
    token_id = db.Column(db.Integer, nullable=True, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, unique=False)
