const persons = require('../data/persons.json');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
}

module.exports = {
  findAll
}