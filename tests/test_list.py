from .conftest import (
    get_token,
    get_json_field,
    get_last_user,
    get_last_list,
    get_last_list_anime
)
from .test_data import (
    post_list_data_200,
    post_list_anime_data_200,
    update_list_data_200,
    login_creds_200,
    login_creds_403,
    login_creds_404,
    login_creds_alt_200
)

class TestList:
    class TestListAnimeRemove:
        def test_remove_anime_200(self, client, add_anime):
            username = get_last_user().username
            list_id = get_last_list().list_id
            mal_id = get_last_list_anime().mal_id
            url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 200
        def test_remove_anime_401(self, client, add_anime):
            username = get_last_user().username
            list_id = get_last_list().list_id
            mal_id = get_last_list_anime().mal_id
            url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.delete(url)
            assert response.status_code == 401
        def test_remove_anime_403(self, client, add_anime, create_user_alt, delete_user_alt):
            username = get_last_user().username
            list_id = get_last_list().list_id
            mal_id = get_last_list_anime().mal_id
            url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 403
        # def test_remove_anime_list_id_check_404(self, client, add_anime):
        #     username = get_last_user().username
        #     list_id = get_last_list().list_id
        #     mal_id = get_last_list_anime().mal_id
        #     url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id)
        #     post_list_anime_data_200["list_id"] = list_id + 1
        #     response = client.delete(url,
        #                              headers={'Authorization': 'Bearer ' +
        #                                  get_token(client)}
        #                              )
        #     assert response.status_code == 404
        def test_remove_anime_404(self, client, add_anime):
            username = get_last_user().username
            list_id = get_last_list().list_id
            mal_id = get_last_list_anime().mal_id
            url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id + 1)
            post_list_anime_data_200["list_id"] = list_id
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 404
        def test_remove_anime_422(self, client, add_anime):
            username = get_last_user().username
            list_id = get_last_list().list_id
            mal_id = get_last_list_anime().mal_id
            url = "/list/" + username + "/" + str(list_id) + "/" + str(mal_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         'invalid_token'}
                                     )
            assert response.status_code == 422
    class TestListAnimeAdd:
        def test_add_anime_200(self, client, create_list):
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
        def test_add_anime_400(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.post(url,
                                   json=post_list_anime_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            response = client.post(url,
                                   json=post_list_anime_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 400
        def test_add_anime_401(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.post(url,
                                   json=post_list_anime_data_200
                                   )
            assert response.status_code == 401
        def test_add_anime_403(self, client, create_list,
                               create_user_alt, delete_user_alt):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.post(url,
                                   json=post_list_anime_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 403
        def test_add_anime_404(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id + 1)
            post_list_anime_data_200["list_id"] = list_id + 1
            response = client.post(url,
                                   json=post_list_anime_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 404
        def test_add_anime_422(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            post_list_anime_data_200["list_id"] = list_id
            response = client.post(url,
                                   json=post_list_anime_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                       'invalid_token'}
                                   )
            assert response.status_code == 422
    class TestListGetListById:
        def test_get_list_200(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                      get_token(client)}
                                  )
            assert response.status_code == 200
        def test_get_list_401(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.get(url)
            assert response.status_code == 401
        def test_get_list_403(self, client, create_list, create_user_alt, delete_user_alt):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                      get_token(client)}
                                  )
            assert response.status_code == 403
        def test_get_list_404(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id + 1)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                      get_token(client)}
                                  )
            assert response.status_code == 404
        def test_get_list_422(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                      'invalid_token'}
                                  )
            assert response.status_code == 422
    class TestListDeleteListById:
        def test_delete_list_200(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 200
        def test_delete_list_401(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.delete(url)
            assert response.status_code == 401
        def test_delete_list_403(self, client, create_list,
                                 create_user_alt, delete_user_alt):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 403
        def test_delete_list_404(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id + 1)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         get_token(client)}
                                     )
            assert response.status_code == 404
        def test_delete_list_422(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.delete(url,
                                     headers={'Authorization': 'Bearer ' +
                                         'invalid_token'}
                                     )
            assert response.status_code == 422
    class TestListUpdateListById:
        def test_update_list_200(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.put(url,
                                  json=update_list_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 200
        def test_update_list_401(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.put(url, json=update_list_data_200)
            assert response.status_code == 401
        def test_update_list_403(self, client, create_list,
                                 create_user_alt, delete_user_alt):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.put(url,
                                  json=update_list_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 403
        def test_update_list_404(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id + 1)
            response = client.put(url,
                                  json=update_list_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 404
        def test_update_list_422(self, client, create_list):
            username = get_last_user().username
            list_id = get_last_list().list_id
            url = "/list/" + username + "/" + str(list_id)
            response = client.put(url,
                                  json=update_list_data_200,
                                  headers={'Authorization': 'Bearer ' +
                                  'invalid_token'}
                                  )
            assert response.status_code == 422
    class TestListGetListsByUsername:
        def test_get_list_200(self, client, create_list):
            username = get_last_user().username
            url = "/list/" + username
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 200
        def test_get_list_403(self, client, create_list, create_user_alt, delete_user_alt):
            username = get_last_user().username
            url = "/list/" + username
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 403
        def test_get_list_404(self, client, create_list):
            url = "/list/" + "sbandera3"
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                                  )
            assert response.status_code == 404
        def test_get_list_422(self, client, create_list):
            username = get_last_user().username
            url = "/list/" + username
            response = client.get(url,
                                  headers={'Authorization': 'Bearer ' +
                                  'invalid_token'}
                                  )
            assert response.status_code == 422
    class TestListPost:
        def test_post_list_200(self, client, create_user, delete_user):
            post_list_data_200["user_id"] = get_last_user().user_id
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 200
        def test_post_list_duplicate_400(self, client, create_user, delete_user):
            post_list_data_200["user_id"] = get_last_user().user_id
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 400
        def test_post_list_400(self, client, create_user, delete_user):
            post_list_data_200["user_idd"] = get_last_user().user_id
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 400
        def test_post_list_403(self, client, create_user, create_user_alt,
                               delete_user_alt, delete_user):
            post_list_data_200["user_id"] = get_last_user().user_id
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   get_token(client)}
                                   )
            assert response.status_code == 403
        def test_post_list_422(self, client, create_user, delete_user):
            post_list_data_200["user_id"] = get_last_user().user_id
            response = client.post("/list",
                                   json=post_list_data_200,
                                   headers={'Authorization': 'Bearer ' +
                                   'invalid_token'}
                                   )
            assert response.status_code == 422
