const fs = require('fs');
const path = require('path');

function writeDataToFile(data) {
  const file = 'src/data/persons.json';
  fs.writeFileSync(path.resolve(file), JSON.stringify(data), 'utf8', (err) => {
    if(err) {
      console.log(err);
    }
  });
}

module.exports = {
  writeDataToFile
}