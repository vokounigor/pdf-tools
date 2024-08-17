FROM node:20-bullseye-slim

WORKDIR /app

RUN apt-get update && apt-get install pdftk -y

COPY . .

RUN yarn install
EXPOSE 3000

CMD yarn dev
