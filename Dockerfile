FROM node:13.10.1

WORKDIR /app

RUN npm install

RUN npm run build

COPY . /app

EXPOSE 3000

ENTRYPOINT npm run start
