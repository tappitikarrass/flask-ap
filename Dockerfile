# syntax=docker/dockerfile:1

# BUILDER
FROM python:3.10.4-alpine as builder
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

# FINAL
FROM python:3.10.4-alpine

RUN mkdir -p /home/app
RUN addgroup --system app && adduser -S app -G app

ENV FLASK_ENV="development"
ENV APP_HOME="/home/app/web"
RUN mkdir $APP_HOME

WORKDIR $APP_HOME
COPY . $APP_HOME
RUN chown -R app:app $APP_HOME

RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev

COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

EXPOSE 8000
EXPOSE 5000

USER app

CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
