// Date parser module
const dateParser = new (require("../dist/DateParser").default)();

// Random number generator function
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

// An array of generated dates
let dates = [];

// Number of dates to generate
let elements = 3000000;

// Helper variable to calculate durations
let start;

console.log(`Generating random dates between ${dateParser.parse("Y-m-d H:i:s", new Date(0))} and ${dateParser.parse("Y-m-d H:i:s", new Date(Date.now()))}...`);

start = Date.now();
for(let i=0; i<elements; i++) {
    dates.push(new Date(rand(0, Date.now())));
}

console.log(`${elements} dates are generated in ${(Date.now() - start) / 1000} seconds.`);

console.log(`Parsing dates with the DateParser module...`);
start = Date.now();
for(let i=0; i<dates.length; i++) {
    dateParser.parse("E. j Y G:I:S A", dates[i]);
}

console.log(`${elements} dates parsed with the module in ${(Date.now() - start) / 1000} seconds.`);