# syntax=docker/dockerfile:1

# BUILDER
FROM python:3.10.4-alpine as builder
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

# APP
FROM python:3.10.4-alpine

ENV FLASK_ENV="development"
ENV APP_HOME="/home/app/web"

# create user and workdir
RUN addgroup --system app && adduser -S app -G app
RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

# copy app
COPY ./app $APP_HOME
COPY ./models $APP_HOME

# copy alembic migrations
COPY ./alembic $APP_HOME
COPY ./alembic.ini $APP_HOME

# copy pytests and curl.sh
COPY ./pytest.ini $APP_HOME
COPY ./tests $APP_HOME
COPY ./curl.sh $APP_HOME

# copy dir containing dockerfiles and entrypoints
COPY ./docker $APP_HOME

# change permissions
RUN chown -R app:app $APP_HOME

# install alpine dependencies
RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev

# copy python wheels
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

EXPOSE 5000

USER app

ENTRYPOINT ["docker/web/entrypoint.sh"]
