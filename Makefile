COV_REPORT=term-missing

curl:
	@sh curl.sh
psql:
	@psql -h localhost -p 5432 -U postgres -d appdb
# pip
pip-install:
	@sudo docker-compose exec web pip install -r requirements.txt
pip-freeze:
	@sudo docker-compose exec web pip freeze > requirements.txt
pip-upgrade:
	@sudo docker-compose exec web /opt/venv/bin/python3 -m pip install --upgrade pip
	@sudo docker-compose exec web pip-upgrade
# docker
flask:
	@sudo docker-compose exec web flask run --host 0.0.0.0 --port 5000
pytest:
	@clear ; sudo docker-compose exec web pytest --cov-report $(COV_REPORT) --cov=app tests
docker-sh:
	@sudo docker-compose exec web sh
docker-up:
	@sudo docker-compose up
docker-down:
	@sudo docker-compose down
docker-init:
	@sudo docker-compose exec postgres su -c "createdb appdb" - postgres
	@sudo docker-compose exec web alembic upgrade head
docker-alembic-reload:
	@sudo docker-compose exec web alembic downgrade base
	@sudo docker-compose exec web alembic upgrade head
docker-info:
	@echo "======= postgres ======="
	@echo "host:\t\t""postgres"
	@echo "port:\t\t""5432"
	@echo -n "user:\t\t"
	@cat docker-compose.yml | grep POSTGRES_USER | awk -F'POSTGRES_USER=' '{ print $$2 }'
	@echo -n "password:\t"
	@cat docker-compose.yml | grep POSTGRES_PASSWORD | awk -F'POSTGRES_PASSWORD=' '{ print $$2 }'
	@echo "database:\t""appdb"
	
	@echo "======= pgadmin4 ======="
	@echo "URL:\t\t""https://localhost:8081"
	@echo -n "email:\t\t"
	@cat docker-compose.yml | grep PGADMIN_DEFAULT_EMAIL | awk -F'PGADMIN_DEFAULT_EMAIL=' '{ print $$2 }'
	@echo -n "password:\t"
	@cat docker-compose.yml | grep PGADMIN_DEFAULT_PASSWORD | awk -F'PGADMIN_DEFAULT_PASSWORD=' '{ print $$2 }'
