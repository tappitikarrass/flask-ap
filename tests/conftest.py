import pytest
from app import (
    app as app_obj,
    db
)
from models.models import (User, Admin)
from models.db_utils import (get_json_field)

from .test_data import (
    post_user_alt_data_200,
    post_user_data_200,
    post_user_data_400,
    login_creds_200,
    login_creds_alt_200,
    login_creds_403
)

@pytest.fixture
def app():
    return app_obj

@pytest.fixture
def create_user(client):
    response = client.post("/user",
                           json=post_user_data_200)

@pytest.fixture
def create_user_alt(client):
    response = client.post("/user",
                           json=post_user_alt_data_200)

@pytest.fixture
def delete_user(client):
    yield
    user_id = get_last_user().user_id
    url = "/user/" + str(user_id)
    response = client.delete(url,
                          headers={'Authorization': 'Bearer ' +
                                 get_token(client) })

@pytest.fixture
def delete_user_alt(client):
    yield
    user_id = get_last_user().user_id
    url = "/user/" + str(user_id)
    response = client.delete(url,
                          headers={'Authorization': 'Bearer ' +
                                 get_token(client, login_creds_alt_200) })

def get_last_user():
    return db.session.query(User).order_by(User.user_id.desc()).first()

def get_token(client, creds=login_creds_200):
    response = client.post("/login",
                           headers={'Authorization': 'Basic ' +
                               creds}
                           )
    token = get_json_field(response, "token")
    return token
