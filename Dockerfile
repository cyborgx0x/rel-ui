FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install -g npm@9.6.6
RUN npm run build
# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


# FROM node:16-alpine
# WORKDIR /app
# COPY package*.json ./
#  RUN yarn install
#  COPY . .
# RUN yarn build
# EXPOSE 3000
# CMD ["yarn", "start"]