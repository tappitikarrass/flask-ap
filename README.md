## Anime catalogue REST API built with Flask

#### Deploy on GNU/Linux
1. Install `docker` and `make`.
1. Clone this repo.
1. Run `make docker-up` inside the cloned repo to build docker image and create containers.
1. Make sure all containers are ready.
1. Run `make docker-init` in another terminal.
1. Now you should be able to access API, Pgadmin4 and Postgres at `localhost` using ports from table at the bottom of readme.

#### Run app with `flask run`
1. Obvious, you should deploy app first.
1. Create local venv with `make local-venv` and install dependencies with `make local-pip-install`.
1. Activate venv with `source venv/bin/activate`
1. Run `make flask`.
1. Make changes.

Source tree is mounted into container. So, it will reload automatically if you change files inside repo directory.

#### Reload app container
By default app container run app using production WSGI server `gunicorn`.

1. Press `Ctrl-C` in terminal running `make docker-up`.
1. Run `make docker-up` again.

If you for some reason want to remove containers run `make docker-down`.

#### Configure pgamdin4 and connect to postgres
1. Run `make docker-info`. It will print login information for postgres and pgadmin4.
1. Login to Pgadmin4.
1. After login click on "Add News Server" icon in "Quick Links" section.
1. Fill name fields in "General" tab. Then fill to fill "Connection" tab using info from `make docker-info`.

#### Makefile
For more information check Makefile, it speaks for itself.

#### Table with ports
| service   | port                             |
|-----------|----------------------------------|
| postgres  | localhost:5432                   |
| pgadmin4  | [localhost:8081](localhost:8081) |
| gunicorn  | [localhost:8000](localhost:8000) |
| flask run | [localhost:5000](localhost:5000) |

#### LICENSE
[BSD-3-Clause License](LICENSE)
