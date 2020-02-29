docker network disconnect slack redis
# docker network disconnect slack rabbit
docker network disconnect slack gateway

# Stop and remove the existing container instance
docker rm -f redis
# docker rm -f rabbit
docker rm -f gateway

# Pull the updated container image from DockerHub
docker pull cchen97/gateway

# Export variables
export TLSCERT=/etc/letsencrypt/live/api.cchen97.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.cchen97.me/privkey.pem

# Re-run a newly-updated instance
docker run -d --name redis --network slack --restart on-failure redis
# docker run -d --name rabbit --network slack --restart on-failure rabbitmq:3-management
sleep 30
# docker run -d --name gateway --network slack --restart on-failure -p 443:443 -e SESSIONKEY=$SESSIONKEY -e REDISADDR=redis:6379 -e MESSAGEADDR=messaging:80 -e PETADDR=pet:80 -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e MYSQL_ROOT_PASSWORD="test" -e DBADDR=userdb:3306 -e RABBITADDR=rabbit:5672 -v /etc/letsencrypt:/etc/letsencrypt:ro demitu/gateway
docker run -d --name gateway --network slack --restart on-failure -p 443:443 -e SESSIONKEY=$SESSIONKEY -e REDISADDR=redis:6379  -e PETADDR=pet:80 -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e MYSQL_ROOT_PASSWORD="test" -e DBADDR=userdb:3306  -v /etc/letsencrypt:/etc/letsencrypt:ro cchen97/gateway