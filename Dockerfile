FROM node:13.10.1

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

COPY .next /app/.next

EXPOSE 3000

ENTRYPOINT npm run start
