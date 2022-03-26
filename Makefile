POSTGRES_PASSWORD=bePG2jqRxmRZiz
PGADMIN_EMAIL=lytvyn349@gmail.com
PGADMIN_PASSWORD=aboba
HOST=127.0.0.1
PORT=8000
COV_REPORT=term

curl:
	sh curl.sh
alembic-reload:
	alembic downgrade base
	alembic upgrade head
pytest:
	clear ; pytest --cov-report $(COV_REPORT) --cov=app tests
# venv
venv:
	python3 -m venv venv
pip-install:
	pip install -r requirements.txt
pip-freeze:
	pip freeze > requirements.txt
# docker
docker-pull:
	sudo docker pull python:3.10.2-alpine
	sudo docker pull postgres:14.2-alpine
	sudo docker pull dpage/pgadmin4:latest
docker-init: docker-pull
	sudo docker run \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-p 5432:5432 \
		--name flask-postgres \
		-d postgres:14.2-alpine
	sudo docker run \
		-e 'PGADMIN_DEFAULT_EMAIL=$(PGADMIN_EMAIL)' \
    	-e 'PGADMIN_DEFAULT_PASSWORD=$(PGADMIN_PASSWORD)' \
		-p 8081:80 \
		--name flask-pgadmin4 \
		-d dpage/pgadmin4:latest
docker-stop: 
	sudo docker stop flask-pgadmin4
	sudo docker stop flask-postgres
docker-start:
	sudo docker start flask-pgadmin4
	sudo docker start flask-postgres
# wsgi
run-flask:
	FLASK_ENV=development flask run --host $(HOST) --port $(PORT)
run-flask-silent:
	FLASK_ENV=development flask run --host $(HOST) --port $(PORT) > /dev/null
run-gunicorn:
	gunicorn -b $(HOST):$(PORT) app:app
run-gunicorn-silent:
	gunicorn -b $(HOST):$(PORT) app:app > /dev/null
pg-psql:
	psql -h localhost -p 5432 -U postgres
