# Docker for frontend

## Workspace and project file structure
.
    ├── app                     # Source code
    ├── dist                    # Compiled files
    ├── nginx                   # copy from folder frontend
    ├── docker-compose.yml      # copy from folder frontend
    ├── Dockerfile              # copy from folder frontend
    ├── .gitignore              # copy from folder frontend
    └── README.md               # project information

## If have source code

- copy it to folder `app`
- config and build app to folder `dist`

## If only web static (not need build)

- copy it to folder `dist`

## Config docker

- Change `container_name` in file `docker-compose.yml`

## Use below script to run docker

```bash
docker-compose up
docker-compose down
docker-compose up --build -d
```