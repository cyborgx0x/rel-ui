FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build