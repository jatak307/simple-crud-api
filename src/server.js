const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/person-controller');

const server = http.createServer((req, res) => {
  const urlArr = req.url.split('/');
  const id = urlArr[urlArr.length - 1];

  const mainUrl = '/persons';
  const personUrl = /\/persons\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

  if (req.url === mainUrl) {
    switch (req.method) {
      case 'GET':
        getPersons(req, res);
        break;
      case 'POST':
        createPerson(req, res);
        break;
    }
  } else if (req.url.match(personUrl)) {
    switch (req.method) {
      case 'GET':
        getPerson(req, res, id);
        break;
      case 'PUT':
        updatePerson(req, res, id);
        break;
      case 'DELETE':
        deletePerson(req, res, id);
        break;
    }
  } else if (req.url.length < 10 && req.url !== mainUrl) {
    res.writeHead(500, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'No trabajas!'}));
  } else if (req.url.length > 10 && req.url !== personUrl) {
    res.writeHead(400, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: `ID ${id} is not valid`}));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
});

module.exports = server;