# Dockerfile for React Frontend
FROM node:alpine3.19
WORKDIR /app
COPY . .
# ENV PATH /node_modules/ .bin:$PATH
# ENV PATH /server_node/ .bin:$PATH
RUN npm install
CMD [ "npm", "start" ]