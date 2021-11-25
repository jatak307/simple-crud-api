const { v4: uuidv4 } = require('uuid');
const persons = require('../data/persons.json');
const { writeDataToFile } = require('../utils/write-to-file');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
}

function findPersonById(id) {
  return new Promise((resolve, reject) => {
    const person = persons.find((pers) => pers.id === id);
    resolve(person);
  });
}

function create(person) {
  return new Promise((resolve, reject) => {
    const newPerson = { id: uuidv4(), ...person };
    persons.push(newPerson);
    writeDataToFile('src/data/persons.json', persons);
    resolve(newPerson);
  });
}

function updatePerson(id, person) {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((pers) => pers.id === id);
    persons[index] = { id, ...person };
    writeDataToFile('src/data/persons.json', persons);
    resolve(persons[index]);
  });
}

module.exports = {
  findAll,
  findPersonById,
  create,
  updatePerson
}