require('dotenv').config();
// const http = require('http');

const persons = [];

const server = http.createServer((req, res) => {
  if(req.url === '/persons' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(persons));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
  
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));