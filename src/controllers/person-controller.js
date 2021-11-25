const { getPostData } = require('../utils/get-post-data');
const { isValidPerson } = require('../helpers/validate');

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
    const body = await getPostData(req);

    if(!isValidPerson(JSON.parse(body))) {
      res.writeHead(400, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Person object is not valid' }));
    } else {
      const { name, age, hobbies } = JSON.parse(body);
      const person = {
        name,
        age,
        hobbies
      };
      const newPerson = await Person.create(person);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newPerson));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desk    Update a Person
// @route   PUT /persons/:id
async function updatePerson(req, res, id) {
  try {
    const person = await Person.findPersonById(id);

    const body = await getPostData(req);
    const { name, age, hobbies } = JSON.parse(body);
    const personData = {
      name: name || person.name,
      age: age || person.age,
      hobbies: hobbies || person.hobbies
    };
    
    if(!person) {
      res.writeHead(404, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: `Person with ID ${id} not found` }));
    } else if (!isValidPerson(personData)){
      res.writeHead(404, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'Person object is not valid' }));
    } else {
      const updatedPerson = await Person.updatePers(id, personData);
       
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedPerson));
    }

  } catch (error) {
    console.log(error);
  }
}

// @desk    Delete Person
// @route   DELETE /persons/:id
async function deletePerson(req, res, id) {
  try {
    const person = await Person.findPersonById(id);
    
    if(!person) {
      res.writeHead(404, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: `Person with ID ${id} not found` }));
    } else {
      await Person.deletePers(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: `Person ${id} removed` }));
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
}