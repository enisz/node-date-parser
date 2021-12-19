# DateParser for node.js

<!-- toc -->

- [Introduction](#introduction)
- [Usage](#usage)
  * [Install](#install)
  * [Initialise](#initialise)
  * [Instantiating the parser](#instantiating-the-parser)
- [Locales](#locales)
- [Methods](#methods)
  * [Parse](#parse)
  * [Load Custom Locale](#load-custom-locale)

<!-- tocstop -->

## Introduction
This is a simple date parsing module for node.js; similar to the [```date()```](http://php.net/manual/en/function.date.php) function of PHP. The module returns a string according to the given formatter string using the given date.

## Usage
### Install
Install with NPM
```
npm install node-date-parser
```

### Initialise

**In a Typescript project**
```import``` the module then create the parser object.

```ts
import DateParser from 'node-date-parser';
parser = new DateParser();
```

**In a Javascript project**
```require``` the module

```js
const DateParser = require('node-date-parser').default;
const parser = new DateParser();

// Or do it in one step
const parser = new (require('node-date-parser').default)();
```

### Instantiating the parser
```ts
public constructor(locale: string = "en")
```

The constructor expects 1 conditional argument: the locale. Check the [the locale section](#locales) for the available languages. If this argument is not provided the locale defaults to `"en"`.

If an unknown locale is provided, the constructor will throw an error.

## Locales

The parser is shipped with a few locale files which contains translated data. Currently these locales can be used:
 - **en**: english
 - **hu**: hungarian

If you would like to use the parser with a different locale you can pass a json file using the [loadCustomLocale method](#load-custom-locale).

Feel free to share your translated locale file with me so it can be published with the parser.

## Methods
### Parse
```ts
public parse(format: string, date: Date = new Date()): string
```
In most cases the parse method is enough. This method expects 2 parameters:
 - `format`: a date formatter string. Check the reference table below for more information.
 - `date`: an optional date object to use for the parsing. Defaults to the current date.

**Format Reference**

| String formatter | Description                                                                      | Example                                 |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| ```d```          | Day of the month, 2 digits with leading zeros                                    | 01 to 31                                |
| ```D```          | A textual representation of a day, short.                                        | mon through sun                         |
| ```E```          | A textual representation of a day, short, capitalized.                           | Mon through Sun                         |
| ```e```          | A textual representation of a day, short, uppercase.                             | MON through SUN                         |
| ```j```          | Day of the month without leading zeros                                           | 1 to 31                                 |
| ```l```          | A full textual representation of the day of the week, lowercase.                 | monday through sunday                   |
| ```K```          | A full textual representation of the day of the week, capitalized.               | Monday through Sunday                   |
| ```N```          | ISO 8601 numeric representation of the day of the week                           | 1 (for Monday) through 7 (for Sunday)   |
| ```w```          | Numeric representation of the day of the week                                    | 0 (for Sunday) through 6 (for Saturday) |
| ```z```          | The day of the year (starting from 0)                                            | 0 through 365                           |
| ```W```          | ISO 8601 week number of year, weeks starting on Monday                           | 42 (the 42nd week in the year)          |
| ```F```          | A full textual representation of a month, such as january or march, lowercase.   | january through december                |
| ```f```          | A full textual representation of a month, such as January or March, capitalized. | january through december                |
| ```m```          | Numeric representation of a month, with leading zeros                            | 01 through 12                           |
| ```M```          | A short textual representation of a month, short, lowercase                      | jan through dec                         |
| ```n```          | Numeric representation of a month, without leading zeros                         | 1 through 12                            |
| ```t```          | Number of days in the given month                                                | 28 through 31                           |
| ```L```          | Whether it's a leap year                                                         | 1 if it is a leap year, 0 otherwise.    |
| ```Y```          | A full numeric representation of a year, 4 digits                                | 1999 or 2003                            |
| ```y```          | A two digit representation of a year                                             | 99 or 03                                |
| ```a```          | Ante meridiem and Post meridiem, lowercase                                       | am or pm                                |
| ```A```          | Ante meridiem and Post meridiem, capitalized                                     | Am or Pm                                |
| ```B```          | Ante meridiem and Post meridiem, uppercase                                       | AM or PM                                |
| ```c```          | Ante meridiem and Post meridiem, uppercase                                       | ante meridiem or post meridiem          |
| ```C```          | Ante meridiem and Post meridiem, capitalized                                     | Ante meridiem or Post meridiem          |
| ```g```          | 12-hour format of an hour without leading zeros                                  | 1 through 12                            |
| ```G```          | 24-hour format of an hour without leading zeros                                  | 0 through 23                            |
| ```h```          | 12-hour format of an hour with leading zeros                                     | 01 through 12                           |
| ```H```          | 24-hour format of an hour with leading zeros                                     | 00 through 23                           |
| ```i```          | Minutes with leading zeros                                                       | 00 to 59                                |
| ```I```          | Minutes without leading zeros                                                    | 0 to 59                                 |
| ```s```          | Seconds with leading zeros.                                                      | 00 through 59                           |
| ```S```          | Seconds without leading zeros.                                                   | 0 through 59                            |
| ```v```          | Milliseconds.                                                                    | 15 or 654                               |
| ```V```          | Milliseconds, 3 digits.                                                          | 015 or 654                              |
| ```U```          | Seconds since the Unix Epoch                                                     | 1639714248                              |

**Example**

```ts
const date = new Date(2021, 11, 1, 14, 42, 39);
console.log(dateParser.parse("Y-m-d H:i:s")); // 2021-12-01 14:42:39
```

### Load Custom Locale
```ts
public loadCustomLocale(customLocaleJson: DateParserLocale): void
```

If you want to use different languages with the parser which are not shipped with it, you can pass a JSON file using this method. The json must match the [`DateParserLocale`](https://github.com/enisz/node-date-parser/blob/master/src/interface/DateParserLocale.ts) interface.
