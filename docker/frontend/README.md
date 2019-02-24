# Docker for frontend

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