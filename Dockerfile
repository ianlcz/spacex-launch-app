FROM node:lts-alpine

LABEL maintainer="ianlcz.io"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]