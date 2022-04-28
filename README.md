# START WITH NPM

cd /project/folder
npm install && npm start
# BUILD AND RUN PROJECT WITH DOCKER

cd /project/folder
docker build project .
docker run -itd -p 10001:80 --name="WEB_DASHBOARD" project

# REMOVE DOCKER CONTAINER

docker rm WEB_DASHBOARD -f

# VIEW RUNNING CONTAINERS

docker ps

