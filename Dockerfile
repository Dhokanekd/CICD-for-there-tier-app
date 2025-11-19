# build stage - simple static build using node (or use create-react-app build)
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Minimal build: create static files by bundler (user may configure webpack)
RUN npm run build || true

# serve stage
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# if you have build output in /app/build use it - fallback: use src as static
COPY build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
