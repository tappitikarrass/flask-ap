from .conftest import (get_token)

class TestAnime:
    def test_get_anime_200(self, client, create_user, delete_user):
        url = "/anime/" + str(47)
        response = client.get(url)
        response = client.get(url,
                              headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                              )
        assert response.status_code == 200
    def test_get_anime_404(self, client, create_user, delete_user):
        url = "/anime/" + "a"
        response = client.get(url)
        response = client.get(url,
                              headers={'Authorization': 'Bearer ' +
                                  get_token(client)}
                              )
        assert response.status_code == 404
