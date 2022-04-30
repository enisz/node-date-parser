const dateParser = new (require("../dist/index").default)();

const date = new Date();

console.log(`Date: ${date}`);
console.log(`The day today: ${dateParser.parse("Y f j. H:i:s, K", date)}`)