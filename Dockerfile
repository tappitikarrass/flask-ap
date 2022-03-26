# syntax=docker/dockerfile:1
FROM python:3.10.2-alpine
WORKDIR /app
RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["exec", "app/venv/bin/alembic", "upgrade", "head"]
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
