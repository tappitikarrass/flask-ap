import pytest
from app import (
    app as app_obj,
    db
)
from models.models import (User, Admin, List, ListAnime)
from models.db_utils import (get_json_field)

from .test_data import (
    post_list_data_200,
    post_list_anime_data_200,
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

# USER
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

# LIST
@pytest.fixture
def create_list(client, create_user, delete_user):
    post_list_data_200["user_id"] = get_last_user().user_id
    response = client.post("/list",
                           json=post_list_data_200,
                           headers={'Authorization': 'Bearer ' +
                           get_token(client)}
                           )

@pytest.fixture
def add_anime(client, create_list):
    username = get_last_user().username
    list_id = get_last_list().list_id
    url = "/list/" + username + "/" + str(list_id)
    post_list_anime_data_200["list_id"] = list_id
    response = client.post(url,
                           json=post_list_anime_data_200,
                           headers={'Authorization': 'Bearer ' +
                           get_token(client)}
                           )
    assert response.status_code == 200

@pytest.fixture
def create_admin(create_user_alt, create_user):
    admin = Admin(user_id=get_last_user().user_id)
    db.session.add(admin)
    db.session.commit()

# UTILS
def get_last_user():
    return db.session.query(User).order_by(User.user_id.desc()).first()
def get_last_list():
    return db.session.query(List).order_by(List.list_id.desc()).first()
def get_last_list_anime():
    return db.session.query(ListAnime).order_by(ListAnime.list_id.desc()).first()

def get_token(client, creds=login_creds_200):
    response = client.post("/login",
                           headers={'Authorization': 'Basic ' +
                               creds}
                           )
    token = get_json_field(response, "token")
    return token
