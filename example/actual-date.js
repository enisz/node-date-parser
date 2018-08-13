const dateParser = require('../src/node-date-parser')

console.log(`Sample script for date-parser with current date:\n`);

const currentYear = dateParser.parse('Y');
const currentMonth = dateParser.parse('F');
const currentDay = dateParser.parse('l');
const currentDate = dateParser.parse('Y-m-d');
const currentTime = dateParser.parse('H:i:s');

console.log(`The current year is ${currentYear}.`);
console.log(`The current month is ${currentMonth}.`);
console.log(`The day today is ${currentDay}.`);

console.log(`The current date is ${currentDate}`);
console.log(`The current time is ${currentTime}`);