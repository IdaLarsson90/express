const nedb = require('nedb-promise');
const database = new nedb({filename: 'database.db', autoload: true});

database.insert({})