const dateParser = require('../src/node-date-parser')

const customMonths = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
const customDays = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const customMeridiems = ['délelőtt', 'délután'];

dateParser.config.months(customMonths);
dateParser.config.days(customDays);
dateParser.config.meridiems(customMeridiems);

console.log(dateParser.parse('Y f j, a H:i - l'));