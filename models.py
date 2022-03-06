from sqlalchemy import (Column, Integer, String, create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.sqltypes import TEXT
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine("postgresql://postgres:bePG2jqRxmRZiz@localhost/appdb")
engine.connect()

BaseModel = declarative_base()
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

user1 = User(id=1,
             username="abobus",
             firstname="a",
             lastname="b",
             email="c@c.com",
             phone="1234",
             password="vitalik"
             )

user1 = session.add(user1)
session.commit()
