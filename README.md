# Date Parser for node.js

<!-- toc -->

- [Introduction](#introduction)
- [Parameters](#parameters)
  * [Format](#format)
  * [Date](#date)
- [Usage](#usage)
  * [Install](#install)
  * [Initialise](#initialise)
  * [Parsing](#parsing)
- [Examples](#examples)
  * [Printing the current date and time](#printing-the-current-date-and-time)
  * [Printing a date and time from a custom date object](#printing-a-date-and-time-from-a-custom-date-object)

<!-- tocstop -->

## Introduction
This is a simple date parsing module for node.js. The module returns a string formatted according to the given format string using the given date object.

## Parameters
```dateParser(format: string, date? = Date)```

### Format
The format of the outputted date string. See the formatting options below.
 - ``Y`` : A full numeric representation of a year, 4 digits | 1999 or 2003
 - ``n`` : Numeric representation of a month, without leading zeros | 1 through 12
 - ``m`` : Numeric representation of a month, with leading zeros | 01 through 12
 - ``j`` : Day of the month without leading zeros | 1 to 31
 - ``d`` : Day of the month, 2 digits with leading zeros | 01 to 31
 - ``G`` : 24-hour format of an hour without leading zeros | 0 through 23
 - ``H`` : 24-hour format of an hour with leading zeros | 00 through 23
 - ``i`` : Minutes with leading zeros | 00 to 59
 - ``s`` : Seconds, with leading zeros | 00 through 59
 - ``N`` : Numeric representation of the day of the week | 1 (for Monday) through 7 (for Sunday)
 - ``l`` : A full textual representation of the day of the week | Sunday through Saturday
 - ``L`` : A full textual representation of the day of the week (lowercase) | Sunday through Saturday
 - ``f`` : A full textual representation of a month, such as January or March | January through December
 - ``F`` : A full textual representation of a month, such as January or March (lowercase) | January through December
 - ``a`` : Lowercase Ante meridiem and Post meridiem | am or pm
 - ``A`` : Uppercase Ante meridiem and Post meridiem | AM or PM
 - ``g`` : 12-hour format of an hour without leading zeros | 1 through 12
 - ``h`` : 12-hour format of an hour with leading zeros | 01 through 12

### Date
Optional second parameter, a [Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). If not provided a new Date object is initialised and used with the current date.

## Usage
### Install
Install it with NPM
```
npm install date-parser
```

### Initialise
You'll need to require the module
```
const dateParser = require('date-parser');
```

### Parsing
After requiring the module you can use it as a function.
```
// output will be: 2018-06-24 16:25:32
console.log(dateParser('Y-m-d H:i:s'));
```

There is an optional second date parameter, which can be used to provide a custom date to parse.

```
const customDate = new Date();

// Setting the date to 03/12/2015 @ 9:02pm (UTC)
customDate.setTime(1426194142000);

// output will be: 2015-03-12 22:02:22
console.log(dateParser('Y-m-d H:i:s'));
```

## Examples
### Printing the current date and time
```
const dateParser = require('date-parser');

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
```
The output of the above script is:
```
The current year is 2018.
The current month is January.
The day today is Monday.
The current date is 2018-06-24
The current time is 16:16:54
```

### Printing a date and time from a custom date object
```
const dateParser = require('date-parser');

const customDate = new Date();

// Setting the date to 03/12/2015 @ 9:02pm (UTC)
customDate.setTime(1426194142000);

// Parsing the date string from a custom date object, passed as a second argument
customParsedDate = dateParser('Y-m-d H:i:s', customDate);

console.log(`Custom date's datetime is ${customParsedDate}.`);
```

The output of the above script is:
```
Custom date's datetime is 2015-03-12 22:02:22
```