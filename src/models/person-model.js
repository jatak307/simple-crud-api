const { v4: uuidv4 } = require('uuid');
const persons = require('../data/persons.json');

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
    resolve(newPerson);
  });
}

module.exports = {
  findAll,
  findPersonById,
  create
}