FROM node:13.10.1

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

EXPOSE 3000

ENTRYPOINT yarn start
