#!/bin/sh

cd web-app
npm i && npm start &
cd ../
docker build -t task-manager-bwilberger .
docker run -d -p 3001:3001 task-manager-bwilberger
