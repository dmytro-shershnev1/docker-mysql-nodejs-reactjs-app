# Docker build layer 1
FROM node:18.20.4-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

# Docker build layer 2
FROM nginx
# Expose the port that the application listens on
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
