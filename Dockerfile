# syntax=docker/dockerfile:1
FROM python:3.10.2-alpine
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
