const dateParser = require('../src/node-date-parser')

console.log(`Sample script for date-parser with custom date:\n`);

const customDate = new Date();

// 03/12/2015 @ 9:02pm (UTC)
customDate.setTime(1426194142000);

// Parsing the date string from a custom date object, passed as a second argument
customParsedDate = dateParser.parse('Y-m-d H:i:s', customDate);

console.log(`Custom date's datetime is ${customParsedDate}.`);