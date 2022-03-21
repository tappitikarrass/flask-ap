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

class AnimeSchema(Schema):
    mal_id = fields.Integer()
    title= fields.String()
    score = fields.Float()
    genres = fields.List(fields.String)
    duration = fields.String()
    rating = fields.String()
    image_url = fields.String()
