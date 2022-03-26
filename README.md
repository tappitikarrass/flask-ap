## Anime catalogue REST API built with Flask

#### How to run it on GNU/Linux
1. Install `docker` and `make`.
1. Clone this repository.
1. Run `make docker-rel-init` inside the cloned directory to build docker image and create container.
1. Now you should be able to access the API on `localhost:8000`.

#### Sending requests using `curl`
You can use functions in `curl.sh` to send test requests.
Call some functions at the bottom of the `curl.sh` and run `make curl` to send requests.

#### Pytest and coverage
Run `make pytest` to run tests and check code coverage.

#### Configure development environment
1. Install following dependencies: `make`, `docker`, `python-3.10.2`, `postgres`.
<br>You may run into some problems using other python3 versions but in generally it should work just fine.
1. Run `make docker-dev-init` to pull docker images and create containers with `postgres` and `pgadmin4` instances.
1. Create virtualenv : `make venv`
1. Activate venv: `source venv/bin/activate`
1. Install dependencies: `make pip-install`
1. You can upgrade depencencies with `pip-upgrade`, but again it may cause problems.
1. Run app with `make run-flask` or `make run-gunicorn`.
1. For more information check `Makefile`, it speaks for itself.

#### LICENSE
[3-Clause BSD License](LICENSE)
