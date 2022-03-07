from marshmallow import (Schema, fields)

class UserSchema(Schema):
    id          = fields.Integer()
    username    = fields.String()
    firstname   = fields.String()
    lastname    = fields.String()
    email       = fields.String()
    phone       = fields.String()
    password    = fields.String()
