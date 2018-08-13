# Date Parser for node.js

<!-- toc -->

- [Introduction](#introduction)
- [Usage](#usage)
  * [Install](#install)
  * [Initialise](#initialise)
  * [Parsing](#parsing)
  * [Configuring](#configuring)
- [Methods](#methods)
  * [Parse](#parse)
  * [Configuration](#configuration)
    + [Months](#months)
    + [Days](#days)
    + [Meridiems](#meridiems)
- [Examples](#examples)
  * [Printing the current date and time](#printing-the-current-date-and-time)
  * [Using custom date object](#using-custom-date-object)
  * [Setting custom month, day and meridiem values](#setting-custom-month-day-and-meridiem-values)

<!-- tocstop -->

## Introduction
This is a simple date parsing module for node.js; similar to the [```date()```](http://php.net/manual/en/function.date.php) function of PHP. The module returns a string according to the given format using the given date.

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
After requiring the module you can parse the dates with the parse method:
```
// output will be: 2018-06-24 16:25:32
console.log(dateParser.parse('Y-m-d H:i:s'));
```
### Configuring
The configuraiton methods can be used to set custom day, month and meridiem names in order to use localised outputs.
```
const customMonths = ['Január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
const customDays = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const customMeridiems = ['délelőtt', 'délután'];

dateParser.config.months(customMonths);
dateParser.config.days(customDays);
dateParser.config.meridiems(customMeridiems);
```
## Methods
### Parse
``parse( format: string, date? = new Date() ): string``<br/>
This method takes a format string and a date object as a parameter and will return a string formatted as the ``format`` string from the provided ``Date`` object. The ``Date`` object is optional. If not provided, a ``new Date`` object is constructed and used.

- Parameters:
  - ``format: string``: The format of the outputted date string. See the formatting options below.
  - ``date: Date [optional]``: Optional second parameter, a [Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). If not provided, a default new Date object is constructed and used.

 - Return value: the method returns a formatted date string.

 - Formatting options:
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
	- ``I`` : minutes without leading zero
	<br/>```0 to 59```
	- ``s`` : seconds, with leading zero
	<br/>```00 through 59```
	- ``S`` : seconds, without leading zero
	<br/>```00 through 59```
	- ``N`` : numeric representation of the day of the week
	<br/>```1 (for Monday) through 7 (for Sunday)```
	- ``k`` : three letter representation of the day of the week
	<br/>```Mon through Sun```
	- ``K`` : three letter representation of the day of the week (lowercase)
	<br/>```mon through sun```
	- ``l`` : full textual representation of the day of the week
	<br/>```Sunday through Saturday```
	- ``L`` : full textual representation of the day of the week (lowercase)
	<br/>```sunday through saturday```
	- ``e`` : Three letter representation of a month
	<br/>```Jan through Dec```
	- ``E`` : Three letter representation of a month (lowercase)
	<br/>```jan through dec```
	- ``f`` : full textual representation of a month, such as January or March (lowercase)
	<br/>```january through december```
	- ``F`` : full textual representation of a month, such as January or March
	<br/>```January through December```
	- ``a`` : lowercase meridiem
	<br/>```am or pm```
	- ``A`` : uppercase meridiem
	<br/>```AM or PM```
	- ``B`` : Meridiem with first capital letter
	<br/>```Am or Pm```
	- ``g`` : 12-hour format of an hour without leading zero
	<br/>```1 through 12```
	- ``h`` : 12-hour format of an hour with leading zero
	<br/>```01 through 12```
	- ``v``  : milliseconds
	<br/>```5 or 74 or 654```
	- ``V`` : milliseconds with leading zeros
	<br/>```005 or 074 or 654```
	- ``x`` : whether it's a leap year
	<br/>```0 or 1```

### Configuration
You have the ability to use custom values for date parsing (solution for localisation). The below configuration methods are available in the ``config`` object

#### Months
``config.months( customMonths: Array<12> ): void``<br/>
You can pass an array with custom month names. The array must contain 12 elements in order. 
 - Parameters:
   - ``customMonths: Array<12>``: an array with the 12 months in order.

The method doesn't have a return value.

#### Days
``config.days( customDays ): void``<br/>
You can pass an array with custom day names. The array must contain 7 elements in order. 
 - Parameters:
   - ``customDays: Array<7>``: an array with the 7 days in order starting with monday.

The method doesn't have a return value.
#### Meridiems
``config.meridiems( customMeridiems ): void``<br/>
You can pass an array with custom month meridiems. The array must contain 2 elements. Ante meridiem first, then Post meridiem  
 - Parameters:
   - ``customMeridiems: Array<2>``: an array with the 2 meridiems

The method doesn't have a return value.
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

### Using custom date object
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

### Setting custom month, day and meridiem values
```
const dateParser = require('../src/node-date-parser')

const customMonths = ['Január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
const customDays = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const customMeridiems = ['délelőtt', 'délután'];

dateParser.config.months(customMonths);
dateParser.config.days(customDays);
dateParser.config.meridiems(customMeridiems);

// Output will be: 2018 február 13, délelőtt 02:59 - Kedd
console.log(dateParser.parse('Y f j, a H:i - l'));
```