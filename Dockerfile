FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN ls -la /app
RUN if [ -d "/app/dist" ]; then ls -la /app/dist; else echo "/app/dist directory not found"; fi

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
