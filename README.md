# TODO
- [ ] Improve backend
  - [ ] Refactor code
  - [ ] Add missing tests
  - [ ] Update swagger.yml
- [ ] Create new propper React frontend
  - [ ] Make propers tests
  - [ ] Use MUI or some other component library
- [ ] Deploy project to Heroku
- [ ] Improve README.md

## Anime catalogue SPA build with Flask and ReactJS

#### Deploy on GNU/Linux
1. [Build React frontend](#build-react-frontend)
1. Install `docker` and `make`.
1. Clone this repo.
1. Run `make up` inside the cloned repo to build docker image and create containers.
1. Make sure all containers are ready.
1. Run `make db-init` in another terminal.
1. Now you should be able to access Nginx and pgAdmin4 at `localhost:80`. See [endpoints table](#endpoints-table).

#### Run app with `flask run`
1. Press `Ctrl+C` in terminal running `make up`
1. Change `DEV=0` to `DEV=1` in `docker/web/endpoint.sh` and save.
1. Run `make up` again and wait until contrainers are loaded.
1. From now on WSGI wll be reloaded each time you make changes to backend.

Source tree is mounted into container. So, it is synced with container no matter where you make changes.

#### Build react frontend
1. Install `nodejs` and `npm`.
1. Cd into `frontend` and run `npm run build`

#### Configure pgAmdin4 and connect to PostgreSQL
1. Run `make login-info`. It will print login information for Postgres and pgAdmin4.
1. Login to Pgadmin4.
1. After login click on "Add News Server" icon in "Quick Links" section.
1. Fill name fields in "General" tab. Then fill the "Connection" tab using info from `make login-info`.
> Change `Host name/adress`, `port`, `Username` and `Password`

#### Makefile
For more information check Makefile, it speaks for itself.

#### Endpoints table
| service                     | endpoint                                                         |
|-----------------------------|--------------------------------------------------------------|
| react frontend              | [localhost:80/](localhost:80/)                               |
| pure js frontend            | [localhost:80/purejsfrontend/](localhost:80/purejsfrontend/) |
| pgadmin4                    | [localhost:80/pgadmin4/](localhost:80/pgadmin4/)             |
| backend(gunicorn/flask run) | [localhost:80/backend](localhost:80/backend/)                        |

#### LICENSE
[BSD-3-Clause License](LICENSE)
