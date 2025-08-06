FROM node:20.11.0-alpine3.18 AS build

WORKDIR /usr/share/app

COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache git make g++ python3

RUN npm cache clean --force && npm install

RUN npm install --save-dev @nx/node

FROM node:20.11.0-alpine3.18

WORKDIR /usr/share/app

RUN apk add --no-cache \
  zlib \
  openssl \
  py3-pip \
  libreoffice \
  ffmpeg \
  imagemagick \
  curl

RUN pip3 install --no-cache-dir unoconv

COPY --from=build /usr/share/app ./
COPY . /usr/share/app

ARG PROJECTS
ENV PROJECTS=${PROJECTS}

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "npm start"]