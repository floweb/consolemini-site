FROM node:6

WORKDIR /data
VOLUME /data

RUN npm install json-server

EXPOSE 3000
