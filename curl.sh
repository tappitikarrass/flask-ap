HOST="127.0.0.1"
PORT="8000"
URL="$HOST:$PORT"

# USER
post_user_1() {
    curl -X POST "$URL/user" \
   -H 'Content-Type: application/json' \
   -d '{"username": "sbandera1",
        "firstname": "Stepan",
        "lastname": "Bandera",
        "email": "stepanko@liamg.com",
        "phone": "123",
        "password": "supersecret"}'
}

post_user_2() {
    curl -X POST "$URL/user" \
   -H 'Content-Type: application/json' \
   -d '{"username": "ivanfranko",
        "firstname": "Ivan",
        "lastname": "Franko",
        "email": "franko@liamg.com",
        "phone": "321",
        "password": "ukraina"}'
}

# $1 - username
# $2 - password
login_user() {
    curl -X POST "$URL/login" \
        -u $1:$2
}

# $1 - user_id
# $2 - bearer token
get_user_by_id() {
    curl -X GET "$URL/user/$1" \
        -H "Authorization: Bearer $2"
}

get_users() {
    curl -X GET "$URL/user"
}

# $1 - user_id
# $2 - bearer token
delete_user_by_id() {
    curl -X DELETE "$URL/user/$1" \
        -H "Authorization: Bearer $2"
}

# $1 - user_id
# $2 - token
update_user_by_id() {
    curl -X PUT "$URL/user/$1" \
        -H "Authorization: Bearer $2" \
        -H 'Content-Type: application/json' \
        -d '{"username": "tarassh",
            "firstname": "Taras",
            "lastname": "Shevchenko",
            "email": "shevchenko@liamg.com",
            "phone": "777",
            "password": "ukraina"}'
}

# $1 - token
logout_user() {
    curl -X DELETE "$URL/logout" \
        -H "Authorization: Bearer $1"
}

# LIST
post_list_1() {
    curl -X POST "$URL/list" \
        -H "Authorization: Bearer $1" \
        -H 'Content-Type: application/json' \
        -d '{"user_id": 2,
            "name": "gems"}'
}

post_list_2() {
    curl -X POST "$URL/list" \
        -H "Authorization: Bearer $1" \
        -H 'Content-Type: application/json' \
        -d '{"user_id": 1,
            "name": "lib"}'
}

post_list_3() {
    curl -X POST "$URL/list" \
        -H "Authorization: Bearer $1" \
        -H 'Content-Type: application/json' \
        -d '{"user_id": 2,
            "name": "abobus"}'
}

# $1 - username
# $2 - token
get_lists_by_username() {
    curl -X GET "$URL/list/$1" \
        -H "Authorization: Bearer $2"
}

# $1 - username
# $2 - list_id
# $3 - token
get_list_by_username_list_id() {
    curl -X GET "$URL/list/$1/$2" \
        -H "Authorization: Bearer $3"
}

# $1 - username
# $2 - list_id
# $3 - token
delete_list_by_id() {
    curl -X DELETE "$URL/list/$1/$2" \
        -H "Authorization: Bearer $3"
}

# $1 - user_id
# $2 - token
update_list_by_id() {
    curl -X PUT "$URL/list/$1/$2" \
        -H "Authorization: Bearer $3" \
        -H 'Content-Type: application/json' \
        -d '{"list_id": 6,
            "user_id": 1,
            "name": "abobix"}'
}

# $1 - username
# $2 - token
add_anime_1() {
    curl -X POST "$URL/list/$1/4" \
        -H "Authorization: Bearer $2" \
        -H 'Content-Type: application/json' \
        -d '{"list_id": 4,
            "mal_id": 47}'
}

# $1 - username
# $2 - token
add_anime_2() {
    curl -X POST "$URL/list/$1/5" \
        -H "Authorization: Bearer $2" \
        -H 'Content-Type: application/json' \
        -d '{"list_id": 5,
            "mal_id": 47}'
}

# $1 - username
# $2 - token
add_anime_3() {
    curl -X POST "$URL/list/$1/6" \
        -H "Authorization: Bearer $2" \
        -H 'Content-Type: application/json' \
        -d '{"list_id": 6,
            "mal_id": 47}'
}

# $1 - username
# $2 - list_id
# $3 - mal_id
# $4 - token
remove_anime() {
    curl -X DELETE "$URL/list/$1/$2/$3" \
        -H "Authorization: Bearer $4"
}
# $1 - mal id
get_anime() {
    curl -X GET "$URL/anime/$1"
}

TOKEN1="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzY1MDkyMSwianRpIjoiMDc3Y2ZmYmItMzc4Yy00NDEwLWIwYjAtNzc1YTgzM2NmN2JiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InNiYW5kZXJhMSIsIm5iZiI6MTY0NzY1MDkyMSwiZXhwIjoxNjUwMjQyOTIxfQ.GWzUZ-qGs0mKAy51eqyHWyMBDpWi5lS9fQSOSksFQCc"
TOKEN2="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzY1MDkyMSwianRpIjoiM2RhZjYwMDctMDU4NS00YTI2LThjOTUtMGUyODk3YmY4NTIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Iml2YW5mcmFua28iLCJuYmYiOjE2NDc2NTA5MjEsImV4cCI6MTY1MDI0MjkyMX0.Cyvkpn0YhTwbpsTGngld_C7UwxFW7cO1ptyWygaOm5c"
TOKEN3=""
# post_user_1
# post_user_2
# post_list_1 $TOKEN1
# post_list_2 $TOKEN1
# post_list_3 $TOKEN1
# login_user sbandera1 supersecret
# login_user ivanfranko ukraina
remove_anime sbandera1 6 47 $TOKEN1
