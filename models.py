from sqlalchemy import (Column, Integer, String)
from sqlalchemy.sql.sqltypes import TEXT
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

BaseModel = declarative_base()
engine = create_engine("postgresql://postgres:bePG2jqRxmRZiz@localhost/appdb")
engine.connect()
SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)
session = Session()

class User(BaseModel):
    __tablename__ = "user"

    id          = Column("user_id", Integer, nullable=False, primary_key=True)
    username    = Column("username", String, nullable=False, unique=True)
    firstname   = Column("firstname", String, nullable=True, unique=False)
    lastname    = Column("lastname", String, nullable=True, unique=False)
    email       = Column("email", String, nullable=False, unique=True)
    phone       = Column("phone", String, nullable=True, unique=True)
    password    = Column("password", TEXT, nullable=False, unique=False)

BaseModel.metadata.create_all(engine)
