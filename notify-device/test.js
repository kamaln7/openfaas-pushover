const h = require('./handler.js');
const fs = require('fs');

h(fs.readFileSync(0, 'utf8'), console.log);
