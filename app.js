require('dotenv').config();
const server = require('./src/server');

const PORT = process.env.PORT || 7000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

if (!module.parent) {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}