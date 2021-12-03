#!/usr/bin/env bash

CMD=$2
: ${CMD:=/bin/bash}

docker start annio-api-services-dev
docker exec -it annio-api-services-dev ${CMD}
