COV_REPORT=term-missing

curl:
	@sh curl.sh
venv:
	@python3 -m venv venv
pytest:
	@clear ; sudo docker-compose exec web pytest --cov-report $(COV_REPORT) --cov=app tests
sh:
	@sudo docker-compose exec -it web sh
up:
	@sudo docker-compose up --attach web
down:
	@sudo docker-compose down
db-init:
	@sudo docker-compose exec postgres su -c "createdb appdb" - postgres
	@sudo docker-compose exec web alembic upgrade head
db-reload:
	@sudo docker-compose exec web alembic downgrade base
	@sudo docker-compose exec web alembic upgrade head
login-info:
	@echo "======= postgres ======="
	@echo "host:\t\t""postgres"
	@echo "port:\t\t""5432"
	@echo -n "user:\t\t"
	@cat docker-compose.yml | grep POSTGRES_USER | awk -F'POSTGRES_USER=' '{ print $$2 }'
	@echo -n "password:\t"
	@cat docker-compose.yml | grep POSTGRES_PASSWORD | awk -F'POSTGRES_PASSWORD=' '{ print $$2 }'
	@echo "database:\t""appdb"
	
	@echo "======= pgadmin4 ======="
	@echo "URL:\t\t""http://localhost/pgadmin4/"
	@echo -n "email:\t\t"
	@cat docker-compose.yml | grep PGADMIN_DEFAULT_EMAIL | awk -F'PGADMIN_DEFAULT_EMAIL=' '{ print $$2 }'
	@echo -n "password:\t"
	@cat docker-compose.yml | grep PGADMIN_DEFAULT_PASSWORD | awk -F'PGADMIN_DEFAULT_PASSWORD=' '{ print $$2 }'
