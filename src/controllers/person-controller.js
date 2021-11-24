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

module.exports = {
  getPersons,
  getPerson
}