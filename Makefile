POSTGRES_PASSWORD=bePG2jqRxmRZiz
PGADMIN_EMAIL=lytvyn349@gmail.com
PGADMIN_PASSWORD=aboba
HOST=127.0.0.1
PORT=8000
COV_REPORT=term-missing

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
# docker-dev
docker-dev-init: docker-pull
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
docker-dev-stop: 
	sudo docker stop flask-pgadmin4 flask-postgres
docker-dev-start:
	sudo docker start flask-pgadmin4 flask-postgres
docker-dev-rm:
	sudo docker rm flask-pgadmin4 flask-postgres
# docker-rel
docker-rel-build: docker-pull
	sudo docker build -t flask-app .
docker-rel-init: docker-rel-build
	sudo docker run -p 8000:8000 \
		--name flask-app \
		-d flask-app:latest
docker-rel-start:
	sudo docker start flask-app
docker-rel-stop-rm:
	sudo docker stop flask-app
	sudo docker rm flask-app
# wsgi
run-gunicorn:
	gunicorn -b $(HOST):$(PORT) app:app
run-flask:
	FLASK_ENV=development flask run --host $(HOST) --port $(PORT)
# postgres
pg-psql:
	psql -h localhost -p 5432 -U postgres
