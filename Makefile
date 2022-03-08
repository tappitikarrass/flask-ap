POSTGRES_PASSWORD=bePG2jqRxmRZiz
HOST=127.0.0.1
PORT=8000

curl:
	sh curl.sh
# alembic
alembic-reload:
	alembic downgrade base
	alembic upgrade head
# venv
venv:
	python3 -m venv venv
pip-install:
	pip install -r requirements.txt
pip-freeze:
	pip freeze > requirements.txt
#docker
docker-pull:
	sudo docker pull python:3.10.2-alpine
	sudo docker pull postgres:14.2-alpine
	sudo docker pull dpage/pgadmin4:latest
run-docker:
	sudo docker-compose build -q
	sudo docker-compose up
# wsgi
run-flask:
	FLASK_ENV=development flask run --host $(HOST) --port $(PORT)
run-gunicorn:
	gunicorn -b $(HOST):$(PORT) app:app
# postgres
pg-rm:
	sudo docker stop flask-postgres
	sudo docker rm flask-postgres
pg-run:
	sudo docker run \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-p 5432:5432 \
		--name flask-postgres \
		-d postgres:14.2-alpine
pg-psql:
	psql -h localhost -p 5432 -U postgres
pgadmin4-run:
	sudo docker run \
		-e 'PGADMIN_DEFAULT_EMAIL=lytvyn349@gmail.com' \
    	-e 'PGADMIN_DEFAULT_PASSWORD=aboba' \
		-p 8081:80 \
		--name flask-pgadmin4 \
    	-d dpage/pgadmin4
