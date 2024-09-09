# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY ./client ./client
COPY ./public ./public

WORKDIR /app/client

# Install dependencies for the React app
RUN npm install

# Build the React app
RUN npm run build

RUN rm -rf docs node_modules src

WORKDIR /app

# Stage 2: Set up the Express server
FROM node:18 AS server

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for the Express server
COPY ./server/package*.json ./

# Install dependencies for the Express server
RUN npm install

# Copy the built React app from the build stage
COPY --from=build /app/client/dist ./client/dist

# Copy the rest of the Express server code
COPY ./server .

# These are dummy certs.
COPY server/privkey.pem ./privkey.pem
COPY server/fullchain.pem ./fullchain.pem

# Expose the HTTPS port
EXPOSE 443

# Start the server
CMD ["node", "server.js"]
