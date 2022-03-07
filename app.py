from flask import (Flask, request, jsonify)
from routes import bp_user

from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"

jwt = JWTManager(app)

app.register_blueprint(bp_user)

@app.route("/")
def hello():
    return "hello world"

if __name__ == "__main__":
    app.run(debug=True)
