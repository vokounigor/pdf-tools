FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY ./src ./src
COPY package*.json .
COPY yarn.lock .

RUN yarn install --production


FROM node:20-bullseye-slim

WORKDIR /app

RUN apt-get update && apt-get install pdftk -y

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=builder /app ./ 

EXPOSE 3000
CMD node src/index.js
