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

eval $(ssh-agent -s)
echo "Started ssh-agent"

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

   # Copy real certs into container
   ls /etc/letsencrypt/live/simplitrac.com/
   docker cp /etc/letsencrypt/live/simplitrac.com/key.pem frontend-container:/app/key.pem
   docker cp /etc/letsencrypt/live/simplitrac.com/cert.pem frontend-container:/app/cert.pem

   docker restart frontend-container

   # Logout from Docker Hub inside droplet
   docker logout
EOF

# Kill the SSH agent
ssh-agent -k

echo "Deployment completed successfully"
