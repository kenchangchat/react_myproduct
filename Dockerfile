FROM node:alpine3.19

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/ .bin:$PATH

RUN npm install

CMD [ "npm", "start" ]