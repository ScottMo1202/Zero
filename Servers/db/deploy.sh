
#!/bin/bash

# Calls the build script you created to rebuild the API server Linux executable and API docker container image
./build.sh

# Pushes your API server Docker container image to Docker Hub
docker push cchen97/userdb

ssh ec2-user@ec2-18-218-125-66.us-east-2.compute.amazonaws.com 'bash -s' < run.sh