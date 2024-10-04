
require('dotenv').config();
const http = require('http');
const app = require('./routes');
const server = http.createServer(app);
const port = process.env.API_PORT || 3001;
// const port = 3001;

server.listen(port, ()=>{
    console.log('Server running on port: ', port);
});