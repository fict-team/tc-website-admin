FROM node:13.10.1

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN npm i -g yarn

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

ENTRYPOINT yarn start
