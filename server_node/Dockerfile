# Dockerfile for Node.js Backend

# Node.js service
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]

# MySQL service
FROM mysql:8
ENV MYSQL_ALLOW_EMPTY_PASSWORD="yes"
ENV MYSQL_DATABASE=db_products
COPY ./db_products.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
