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
This is a simple date parsing module for node.js; similar to the [```date()```](http://php.net/manual/en/function.date.php) function of PHP. The module returns a string according to the given format using the given date.

## Parameters
```dateParser(format: string, date? = Date): string```

### ```format: string```
The format of the outputted date string. See the formatting options below.
 - ``Y`` : full numeric representation of a year, 4 digits
 <br/>```1993 or 2003```
 - ``n`` : numeric representation of a month, without leading zero
 <br/>```1 through 12```
 - ``m`` : numeric representation of a month, with leading zero
 <br/>```01 through 12```
 - ``j`` : day of the month without leading zero
 <br/>```1 to 31```
 - ``d`` : day of the month, 2 digits with leading zero
 <br/>```01 to 31```
 - ``G`` : 24-hour format of an hour without leading zero
 <br/>```0 through 23```
 - ``H`` : 24-hour format of an hour with leading zero
 <br/>```00 through 23```
 - ``i`` : minutes with leading zero
 <br/>```00 to 59```
 - ``s`` : seconds, with leading zero
 <br/>```00 through 59```
 - ``N`` : numeric representation of the day of the week
 <br/>```1 (for Monday) through 7 (for Sunday)```
 - ``l`` : full textual representation of the day of the week
 <br/>```Sunday through Saturday```
 - ``L`` : full textual representation of the day of the week (lowercase)
 <br/>```sunday through saturday```
 - ``f`` : full textual representation of a month, such as January or March
 <br/>```January through December```
 - ``F`` : full textual representation of a month, such as January or March (lowercase)
 <br/>```january through december```
 - ``a`` : lowercase Ante meridiem and Post meridiem
 <br/>```am or pm```
 - ``A`` : uppercase Ante meridiem and Post meridiem
 <br/>```AM or PM```
 - ``g`` : 12-hour format of an hour without leading zero
 <br/>```1 through 12```
 - ``h`` : 12-hour format of an hour with leading zero
 <br/>```01 through 12```

### ```date: Date [optional]```
Optional second parameter, a [Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). If not provided the current date will be used.

## Usage
### Install
Install with NPM
```
npm install node-date-parser
```

### Initialise
```require``` the module
```
const dateParser = require('node-date-parser');
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

const currentDate = dateParser('Y-m-d');
const currentTime = dateParser('H:i:s');

console.log(`The current date is ${currentDate}`);
console.log(`The current time is ${currentTime}`);
```
The output of the above script is:
```
The current date is 2018-06-24
The current time is 16:16:54
```

### Printing a date and time from a custom date object
```
const dateParser = require('node-date-parser');

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