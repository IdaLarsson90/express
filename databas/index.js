const nedb = require('nedb-promise');
const database = new nedb({filename: 'database.db', autoload: true});

// database.insert({firstname:"Anna", lastname:"Svensson", age: 31})
// database.insert({firstname:"Maj", lastname:"Svensson", age: 21})
// database.insert({firstname:"Sven", lastname:"Persson", age: 47})
// database.insert({firstname:"Elsa", lastname:"Grön", age: 41})
// database.insert({firstname:"Micke", lastname:"Makaron", age: 17})

// async function getPerson() {
//     const person = await database.find({ age: {$gt: 30}});
//     console.log(person);
// }
// getPerson();

// database.update({ firstname: 'Anna'}, { $set: {firstname:'Andreas'}})

// database.remove({_id: "WRIVEy4O5PoLMbGW"})