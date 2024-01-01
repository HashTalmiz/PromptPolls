FROM node:lts-buster AS development


WORKDIR /usr/src/app


COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app


RUN npm ci


COPY . /usr/src/app


EXPOSE 8080


CMD ["npm", "run", "dev" ]