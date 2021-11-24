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

module.exports = {
  findAll,
  findPersonById
}