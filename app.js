require('dotenv').config();
const { getPersons } = require('./src/controllers/person-controller');
const http = require('http');

// const persons = [];

const server = http.createServer((req, res) => {
  if(req.url === '/persons' && req.method === 'GET') {
    getPersons(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
  
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));