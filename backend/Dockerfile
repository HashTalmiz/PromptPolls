FROM node:lts-buster-slim AS development

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY prisma /usr/src/app/prisma/

RUN apt-get update -y && apt-get install -y openssl

RUN npm ci

COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "push:prod" ]

FROM development as dev-envs
RUN <<EOF
RUN apt-get update && apt-get install -y --no-install-recommends git


RUN <<EOF
RUN useradd -s /bin/bash -m vscode && groupadd docker && usermod -aG docker vscode


COPY --from=gloursdocker/docker / /
CMD [ "npm", "run", "dev" ]