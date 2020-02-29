docker network create slack

docker network disconnect slack userdb

# Stop and remove the existing container instance
docker rm -f userdb

# Pull the updated container image from DockerHub
docker pull cchen97/userdb

# Re-run a newly-updated instance
docker run -d --name userdb --network slack --restart on-failure -e MYSQL_ROOT_PASSWORD="test" -e MYSQL_DATABASE=userdb cchen97/userdb