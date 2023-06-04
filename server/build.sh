#!/usr/bin/env bash

docker stop duo-server
docker rm duo-server
docker rmi duo-api
docker build -t duo-api .
docker run --name duo-server -p 8000:8000 duo-api
