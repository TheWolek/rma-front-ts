# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

ARG BASE_URL
ARG VUE_APP_API_BASE_URL
ARG VUE_APP_MODULE_WAREHOUSE
ARG VUE_APP_MODULE_SPAREPARTS
ARG VUE_APP_MODULE_ADMIN

ENV BASE_URL=$BASE_URL
ENV VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL
ENV VUE_APP_MODULE_WAREHOUSE=$VUE_APP_MODULE_WAREHOUSE
ENV VUE_APP_MODULE_SPAREPARTS=$VUE_APP_MODULE_SPAREPARTS
ENV VUE_APP_MODULE_ADMIN=$VUE_APP_MODULE_ADMIN

COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]