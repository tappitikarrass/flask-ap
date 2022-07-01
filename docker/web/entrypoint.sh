#!/bin/sh

DEV=1
host=0.0.0.0
port=5000


[ "$DEV" = 1 ] && flask run -h "$host" -p "$port" || gunicorn -b 0.0.0.0:"$port" app:app
