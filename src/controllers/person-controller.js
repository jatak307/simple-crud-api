const Person = require('../models/person-model');

// @desk    Gets All Persons
// @route   GET /persons
async function getPersons(req, res) {
  try {
    const persons = await Person.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
}

// @desk    Gets Single Person
// @route   GET /persons/:id
async function getPerson(req, res, id) {
  try {
    const person = await Person.findPersonById(id);

    if(!person) {
      res.writeHead(404, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: `Person with ID ${id} not found` }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desk    Create a Person
// @route   POST /persons
async function createPerson(req, res) {
  try {

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, age, hobbies } = JSON.parse(body);
      
      const person = {
        name,
        age,
        hobbies
      };

      const newPerson = await Person.create(person);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newPerson));
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  getPerson,
  createPerson
}