from app import (db)
from models.models import (User)
from models.db_utils import (get_json_field)
from .conftest import (
    get_last_user,
    get_token
)
from .test_data import (
    post_user_data_200,
    post_user_data_400,
    update_user_data_200,
    login_creds_200,
    login_creds_403,
    login_creds_404,
    login_creds_alt_200
)

class TestUser:
    class TestUserLogin:
        def test_login_200(self, client, create_user, delete_user):
            response = client.post("/login",
                                   headers={'Authorization': 'Basic ' +
                                   login_creds_200}
                                   )
            assert response.status_code == 200
        def test_login_401(self, client, create_user, delete_user):
            response = client.post("/login")
            assert response.status_code == 401
        def test_login_403(self, client, create_user, delete_user):
            response = client.post("/login",
                                   headers={'Authorization': 'Basic ' +
                                   login_creds_403}
                                   )
            assert response.status_code == 403
        def test_login_404(self, client, create_user, delete_user):
            response = client.post("/login",
                                   headers={'Authorization': 'Basic ' +
                                   login_creds_404}
                                   )
            assert response.status_code == 404
    class TestUserLogout:
        def test_logout_200(self, client, create_user, delete_user):
            response = client.delete("/logout",
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 200
        def test_logout_401(self, client, create_user, delete_user):
            response = client.delete("/logout")
            assert response.status_code == 401
        def test_logout_422(self, client, create_user, delete_user):
            response = client.delete("/logout",
                                   headers={'Authorization': 'Bearer ' +
                                   'invalid_token'}
                                   )
            assert response.status_code == 422
    # class TestUserGet:
    class TestUserPost:
        def test_post_user_200(self, client, delete_user):
            response = client.post("/user",
                                   json=post_user_data_200)
            assert response.status_code == 200
        def test_post_user_400(self, client):
            response = client.post("/user",
                                   json=post_user_data_400)
            assert response.status_code == 400
    class TestUserDelete: 
        def test_delete_user_200(self, client, create_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 200
        def test_delete_user_401(self, client, create_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.delete(url)
            assert response.status_code == 401
        def test_delete_user_403(self, client, create_user, create_user_alt,
                              delete_user_alt, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                    get_token(client, login_creds_200)}
                                     )
            assert response.status_code == 403
        def test_delete_user_404(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id + 1)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 404
        def test_delete_user_422(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         'invalid_token'}
                                     )
            assert response.status_code == 422
    class TestUserUpdate:
        def test_update_user_200(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.put(url,
                                     json=update_user_data_200,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 200
        def test_update_user_401(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.put(url, json=update_user_data_200)
            assert response.status_code == 401
        def test_update_user_403(self, client, create_user, create_user_alt,
                              delete_user_alt, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.put(url,
                                  json=update_user_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                      get_token(client, login_creds_200)}
                                  )
            assert response.status_code == 403
        def test_update_user_404(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id + 1)
            response = client.put(url,
                                  json=update_user_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                      get_token(client)}
                                  )
            assert response.status_code == 404
        def test_update_user_422(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.put(url,
                                     json=update_user_data_200,
                                     headers={'Authorization': 'Bearer ' +
                                      'invalid_token'}
                                  )
            assert response.status_code == 422
    class TestUserGetById:
        def test_get_user_200(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 200
        def test_get_user_401(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.get(url)
            assert response.status_code == 401
        def test_get_user_403(self, client, create_user, create_user_alt,
                              delete_user_alt, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client, login_creds_200)}
                                  )
            assert response.status_code == 403
        def test_get_user_404(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id + 1)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 404
        def test_get_user_422(self, client, create_user, delete_user):
            user_id = get_last_user().user_id
            url = "/user/" + str(user_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  'invalid_token'}
                                  )
            assert response.status_code == 422
