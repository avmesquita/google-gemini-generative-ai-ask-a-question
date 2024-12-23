### STAGE 1: BUILDER ###
ARG NODE_VERSION=18.20.0
ARG ALPINE_VERSION=3.20.3
ARG NGINX_VERSION=1.27.2

### NODE IMAGE
FROM node:${NODE_VERSION}-alpine AS node

### ALPINE IMAGE
FROM alpine:${ALPINE_VERSION} as builder

### COPY NODE FOLDERS
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

### CREATE DESTINATION APP FOLDER
RUN mkdir -p /ng-app/dist/gemini-app

### SET A WORKDIR
WORKDIR /ng-app

### COPY APP TO WORKDIR ROOT FOLDER
COPY package.json package-lock.json ./

### INSTALL ANGULAR CLI 17.3.4
RUN npm install -g @angular/cli@17.3.4

### INSTALL APP PACKAGES
RUN npm install 

### COPY APP ALL FILES (include node_modules)
COPY . .

###RUN yarn run build
RUN npm run build

COPY ./nginx.conf /ng-app/dist/gemini-app/nginx.conf

### STAGE 2: SETUP ###

FROM nginx

### COPY APP BUILT
COPY --from=builder /ng-app/dist/gemini-app/browser /usr/share/nginx/html
COPY --from=builder /ng-app/dist/gemini-app/browser /var/www/html

### CONFIGURE NGINX
COPY --from=builder /ng-app/dist/gemini-app/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]