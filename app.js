require('dotenv').config();
const { getPersons, getPerson, createPerson } = require('./src/controllers/person-controller');
const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/persons' && req.method === 'GET') {
    getPersons(req, res);
  } else if(req.url.match(/\/persons\/([0-9]+)/) && req.method === 'GET') {
    const urlArr = req.url.split('/');
    const id = urlArr[urlArr.length - 1];
    getPerson(req, res, id);
  } else if(req.url === '/persons' && req.method === 'POST') {
    createPerson(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));