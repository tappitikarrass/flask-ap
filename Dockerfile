# syntax=docker/dockerfile:1
FROM python:3.10.4-alpine
ENV VENV="/opt/venv"
ENV PATH="$VENV/bin:$PATH"
ENV FLASK_ENV="development"
WORKDIR /app
COPY . .
RUN apk add postgresql linux-headers py3-psycopg2 python3-dev gcc libc-dev libffi-dev libpq-dev
RUN python3 -m venv $VENV
RUN pip install -r requirements.txt
EXPOSE 8000
EXPOSE 5000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
