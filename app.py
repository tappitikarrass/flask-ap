from flask import Flask
from .models import User

app = Flask(__name__)

@app.route("/")
def hello():
    return "hello world"

if __name__ == "__main__":
    app.run(debug=True)
