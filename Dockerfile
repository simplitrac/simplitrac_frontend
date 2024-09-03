# Use the node image to build the app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the frontend application
RUN npm run build

# Install a simple HTTP server to serve your static files
RUN npm install -g serve

# Serve the build output using the simple HTTP server on port 80
CMD ["serve", "-s", "dist", "-l", "80"]

# Expose port 80
EXPOSE 80