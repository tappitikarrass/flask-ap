HOST="127.0.0.1"
PORT="8000"
URL="$HOST:$PORT"

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
# $2 - tocken
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

# post_user_1
# post_user_2
# login_user sbandera1 supersecret
# login_user ivanfranko ukraina
# login_user tarassh ukraina
# get_user_by_id 1
TOKEN1=""
# get_user_by_id 2 $TOKEN1
# delete_user_by_id 2 $TOKEN1
# update_user_by_id 2 $TOKEN1
# get_user_by_id 1 $TOKEN1
