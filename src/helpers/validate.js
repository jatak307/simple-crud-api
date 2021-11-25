function isValidPerson(pers) {
  const persKeys = Object.keys(pers).length === 3;
  let correctName = false;
  let correctAge = false;
  let correctHobbies = false;

  for (const [key, val] of Object.entries(pers)) {
    if (key === 'name' && typeof val === 'string' && val.length >= 1) {
      correctName = true;
    }
    if (key === 'age' && typeof val === 'number' && val >= 0) {
      correctAge = true;
    }
    if (key === 'hobbies' && Array.isArray(val)) {
      correctHobbies = true;
    }
  }

  const isValid = persKeys && correctName && correctAge && correctHobbies;
  return isValid;
}

module.exports = {
  isValidPerson
}