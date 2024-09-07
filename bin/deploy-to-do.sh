#!/bin/bash

cd ../client/ || exit
# Load environment variables from .env file
if [ -f .env ]; then
  export DO_ACCESS_TOKEN=$(grep DO_ACCESS_TOKEN .env | cut -d '=' -f2)
  export DOCKER_USERNAME=$(grep DOCKER_USERNAME .env | cut -d '=' -f2)
  export DOCKER_PASSWORD=$(grep DOCKER_PASSWORD .env | cut -d '=' -f2)
  export DO_DROPLET_IP=$(grep DO_DROPLET_IP .env | cut -d '=' -f2)
else
  echo ".env file not found"
  exit 1
fi
# Ensure doctl is authenticated
doctl auth init -t "$DO_ACCESS_TOKEN"

cd ..

# Login to Docker Hub
echo "Logging into Docker Hub..."
docker_login_output=$(echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin)
echo "$docker_login_output"

if echo "$docker_login_output" | grep -q "Login Succeeded"; then
    echo "Docker login successful."
else
    echo "Docker login failed."
    exit 1
fi

# Path to docker-compose.yml
# COMPOSE_FILE="./docker-compose.yml"
SECOND_COMPOSE_FILE="./bin/docker-compose.yml"

echo "Removing old images..."
docker rmi simplitrac/frontend:latest simplitrac/backend:latest

# Build Docker images with the correct platform
echo "Building Docker images..."
pwd
docker build --platform linux/amd64 -t simplitrac/frontend:latest .
docker push simplitrac/frontend:latest

cd ../SimpliTrac/functions/
pwd
docker build --platform linux/amd64 -t simplitrac/backend:latest .
docker push simplitrac/backend:latest

cd ../../simplitrac_frontend

# Log out of Docker Hub
docker logout

eval $(ssh-agent -s)
echo "Started ssh-agent"

# Copy docker-compose.yml to DigitalOcean droplet
echo "Copying docker-compose.yml to DigitalOcean droplet..."
scp  $SECOND_COMPOSE_FILE root@$DO_DROPLET_IP:/root/ || exit

# SSH into the droplet and pull+run the images
echo "Pulling and running images on DigitalOcean droplet..."
ssh  root@$DO_DROPLET_IP << EOF
   # Export environment variables
   export DOCKER_USERNAME='$DOCKER_USERNAME'
   export DOCKER_PASSWORD='$DOCKER_PASSWORD'

   # Check if Docker is installed
   if ! command -v docker &> /dev/null; then
       echo "Docker not found. Installing Docker..."
       # Update package list
       apt-get update
       # Install Docker using the convenience script
       snap install docker
       echo "Docker and Docker Compose installed successfully"
   else
       echo "Docker is already installed"
   fi

   # Login to Docker Hub
   echo "Logging into Docker Hub inside droplet..."
   docker_login_output=\$(echo "\$DOCKER_PASSWORD" | docker login --username "\$DOCKER_USERNAME" --password-stdin)
   echo "\$docker_login_output"

   if echo "\$docker_login_output" | grep -q "Login Succeeded"; then
       echo "Docker login successful."
   else
       echo "Docker login failed inside droplet."
       exit 1
   fi

   yes | docker system prune

   # Pull images from Docker Hub
   docker pull simplitrac/backend:latest
   docker pull simplitrac/frontend:latest

   # Stop existing containers
   docker compose -f /root/docker-compose.yml down

   # Run new containers
   docker compose -f /root/docker-compose.yml up -d

   echo "Containers are now running on the DigitalOcean droplet"

   # Logout from Docker Hub inside droplet
   docker logout
EOF

# Kill the SSH agent
ssh-agent -k

echo "Deployment completed successfully"
