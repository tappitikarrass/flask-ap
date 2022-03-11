from marshmallow import (Schema, fields)

class UserSchema(Schema):
    user_id = fields.Integer()
    username = fields.String()
    firstname = fields.String()
    lastname = fields.String()
    email = fields.String()
    phone = fields.String()
    password = fields.String()

class ListSchema(Schema):
    list_id = fields.Integer()
    user_id = fields.Integer()
    name = fields.String()

class ListAnimeSchema(Schema):
    list_id = fields.Integer()
    mal_id = fields.Integer()

class AdminSchema(Schema):
    admin_id = fields.Integer()
    user_id = fields.Integer()
