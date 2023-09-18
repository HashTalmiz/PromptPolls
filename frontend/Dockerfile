FROM node:lts-buster AS development


WORKDIR /usr/src/app


COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app


RUN npm ci


COPY . /usr/src/app


EXPOSE 8080


CMD ["npm", "start"]

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

COPY --from=gloursdocker/docker / /
CMD [ "npm", "run", "dev" ]