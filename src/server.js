const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/person-controller');

const server = http.createServer((req, res) => {
  const urlArr = req.url.split('/');
  const id = urlArr[urlArr.length - 1];

  if(req.url === '/persons' && req.method === 'GET') {
    getPersons(req, res);
  } else if(req.url.match(/\/persons\/([0-9]+)/) && req.method === 'GET') {
    getPerson(req, res, id);
  } else if(req.url === '/persons' && req.method === 'POST') {
    createPerson(req, res);
  } else if(req.url.match(/\/persons\/([0-9]+)/) && req.method === 'PUT') {
    updatePerson(req, res, id);
  } else if(req.url.match(/\/persons\/([0-9]+)/) && req.method === 'DELETE') {
    deletePerson(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
});

module.exports = server;