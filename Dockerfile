FROM node:12.19-alpine

# APP
ARG PORT
ARG DEBUG_PORT
ARG API_PREFIX

# SERVICES
ARG SERVICE_ORDER_RMQ_URL
ARG SERVICE_ORDER_RMQ_QUEUE
ARG SERVICE_PAYMENT_RMQ_URL
ARG SERVICE_PAYMENT_RMQ_QUEUE

# ENVIRONMENT
ENV NODE_ENV development
ENV PORT $PORT
ENV DEBUG_PORT $DEBUG_PORT
ENV API_PREFIX $API_PREFIX
ENV SERVICE_ORDER_RMQ_URL $SERVICE_ORDER_RMQ_URL
ENV SERVICE_ORDER_RMQ_QUEUE $SERVICE_ORDER_RMQ_QUEUE
ENV SERVICE_PAYMENT_RMQ_URL $SERVICE_PAYMENT_RMQ_URL
ENV SERVICE_PAYMENT_RMQ_QUEUE $SERVICE_PAYMENT_RMQ_QUEUE

WORKDIR /usr/src/app

RUN apk update
RUN apk add g++ make python
RUN apk add git bash

COPY package*.json ./

# add yarn
RUN npm i yarn@latest -g --force

RUN yarn install

COPY . .

RUN yarn run build

ENTRYPOINT [ "bash", "./init.sh" ]