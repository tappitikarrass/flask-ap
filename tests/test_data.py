import base64

# USER
post_user_data_200 = {
   "username": "sbandera1",
   "firstname": "Stepan",
   "lastname": "Bandera",
   "email": "stepanko@liamg.com",
   "phone": "123",
   "password": "supersecret"
}

post_user_alt_data_200 = {
   "username": "ivanbahryanyi",
   "firstname": "Ivan",
   "lastname": "Bahryanyi",
   "email": "bahryanyi@liamg.com",
   "phone": "30",
   "password": "fcksovietunion"
}

post_user_data_400 = {
   "usernameeee": "sbandera1",
   "firstname": "Stepan",
   "lastname": "Bandera",
   "email": "stepanko@liamg.com",
   "phone": "123",
   "password": "supersecret"
}

update_user_data_200 = {
   "username": "sbandera1",
   "firstname": "Ivan",
   "lastname": "Franko",
   "email": "ivanko@liamg.com",
   "phone": "111",
   "password": "supersecret"
}

login_creds_200 = base64.b64encode(b'sbandera1:supersecret').decode('utf-8')
login_creds_alt_200 = base64.b64encode(b'ivanbahryanyi:fcksovietunion').decode('utf-8')
login_creds_403 = base64.b64encode(b'sbandera1:supersecreta').decode('utf-8')
login_creds_404 = base64.b64encode(b'sbandera2:supersecret').decode('utf-8')

# LIST
post_list_data_200 = {
  "name": "watchlist"
}
update_list_data_200 = {
  "name": "newname"
}
post_list_anime_data_200 = {
    "mal_id": 47
}
