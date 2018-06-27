const dateParser = require('../src/node-date-parser');

console.log(`Sample script for date-parser with current date:\n`);

const currentYear = dateParser('Y');
const currentMonth = dateParser('F');
const currentDay = dateParser('l');
const currentDate = dateParser('Y-m-d');
const currentTime = dateParser('H:i:s');

console.log(`The current year is ${currentYear}.`);
console.log(`The current month is ${currentMonth}.`);
console.log(`The day today is ${currentDay}.`);

console.log(`The current date is ${currentDate}`);
console.log(`The current time is ${currentTime}`);