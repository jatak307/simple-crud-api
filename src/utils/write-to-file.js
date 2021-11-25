const fs = require('fs');
const path = require('path');

function writeDataToFile(file, data) {
  fs.writeFileSync(path.resolve(file), JSON.stringify(data), 'utf8', (err) => {
    if(err) {
      console.log(err);
    }
  });
}

module.exports = {
  writeDataToFile
}