POSTGRES_PASSWORD=bePG2jqRxmRZiz

# docker
run-docker:
	sudo docker-compose build -q
	sudo docker-compose up
# wsgi
run-flask:
	flask run --host 127.0.0.1 --port 8000
run-gunicorn:
	gunicorn -b 127.0.01:8000 app:app
# pip
pip-install:
	pip install -r requirements.txt
pip-freeze:
	pip freeze > requirements.txt

# postgres
postgres-rm:
	sudo docker stop flask-postgres
	sudo docker rm flask-postgres
postgres-run:
	sudo docker run --name flask-postgres -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) -d -p 5432:5432 postgres:14.2-alpine
postgres-connect:
	psql -h localhost -p 5432 -U postgres
