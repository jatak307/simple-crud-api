const http = require('http');

function find() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

module.exports = {
  find
}