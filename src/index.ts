import { DateParserLocale } from './interface/DateParserLocale';
import Fs from 'fs';
import Path from 'path';

export default class DateParser {
    [key: string]: any;

    private locale: DateParserLocale;

    /**
     * Instantiating a DateParser object.
     *
     * @param locale Language Settings to use. Defaults to "en"
     */
    public constructor(locale: string = "en") {
        try {
            this.locale = this.loadLocale(locale);
        } catch (error) {
            throw `DateParser Failed to load locale '${locale}'!`;
        }
    }

    /**
     * Loading a locale file
     * @param locale The locale to load
     * @returns The locale json as DateParserLocale
     */
    private loadLocale(locale: string): DateParserLocale {
        return JSON.parse(Fs.readFileSync(Path.join(__dirname, "locale", `${locale}.json`), {encoding: "utf-8"})) as DateParserLocale;
    }

    /**
     * Capitalize a string
     * @param string The string to capitalize
     * @returns The capitalized string
     */
    private capitalize(string: string): string {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    /**
     * Load a custom locale json to use
     * @param customLocaleJson Custom locale json file
     */
    public loadCustomLocale(customLocaleJson: DateParserLocale): void {
        this.locale = customLocaleJson;
    }

    /**
     * Parsing a date to string using a formatter string
     * @param format The output format of the date
     * @param date The date object
     * @returns a date string formatted according to the input format string.
     */
    public parse(format: string, date: Date = new Date()): string {
        let formatted: string[] = [];

        for(let i=0; i<format.length; i++) {
            const char: string = format.charAt(i);

            if(char in this) {
                formatted.push(this[char](date));
            } else {
                formatted.push(char);
            }
        }

        return formatted.join("");
    }

    /**
     * Day of the month, 2 digits with leading zeros
     * Example: 01 to 31
     *
     * @param date The date object to use
     * @returns Day of the month, 2 digits with leading zeros.
     */
     private d(date: Date = new Date()): string {
        const day: string = date.getDate().toString();
        return day.length === 1 ? `0${day}` : day;
    }

    /**
     * A textual representation of a day, short.
     * Example: mon through sun
     *
     * @param date The date object to use
     * @returns A textual representation of a day, short
     */
    private D(date: Date = new Date()): string {
        return this.locale.day.short[date.getDay()].toLowerCase();
    }

    /**
     * A textual representation of a day, short, capitalized.
     * Example: Mon through Sun
     *
     * @param date The date object to use
     * @returns A textual representation of a day, short, capitalized
     */
    private E(date: Date = new Date()): string {
        return this.capitalize(this.D(date));
    }

    /**
     * A textual representation of a day, short, uppercase.
     * Example: MON through SUN
     *
     * @param date The date object to use
     * @returns A textual representation of a day, short, uppercase
     */
    private e(date: Date = new Date()) {
        return this.D(date).toUpperCase()
    }

    /**
     * Day of the month without leading zeros
     * Example: 1 to 31
     *
     * @param date The date object to use
     * @returns Day of the month without leading zeros
     */
    private j(date: Date = new Date()): string {
        return date.getDate().toString();
    }

    /**
     * A full textual representation of the day of the week, lowercase.
     * Example: monday through sunday
     *
     * @param date The date object to use
     * @returns A full textual representation of the day of the week, lowercase
     */
    private l(date: Date = new Date()): string {
        return this.locale.day.full[date.getDay()].toLowerCase();
    }

    /**
     * A full textual representation of the day of the week, capitalized.
     * Example: Monday through Sunday
     *
     * @param date The date object to use
     * @returns A full textual representation of the day of the week, capitalized
     */
    private K(date: Date = new Date()): string {
        return this.capitalize(this.l(date));
    }

    /**
     * ISO 8601 numeric representation of the day of the week
     * Example: 1 (for Monday) through 7 (for Sunday)
     *
     * @param date The date object to use
     * @returns ISO 8601 numeric representation of the day of the week
     */
    private N(date: Date = new Date()): string {
        return date.getDay().toString();
    }

    /**
     * Numeric representation of the day of the week
     * Example: 0 (for Sunday) through 6 (for Saturday)
     *
     * @param date The date object to use
     * @returns Numeric representation of the day of the week
     */
    private w(date: Date = new Date()): string {
        return date.getDay().toString();
    }

    /**
     * The day of the year (starting from 0)
     * Example: 0 through 365
     *
     * @param date The date object to use
     * @returns The day of the year (starting from 0)
     */
    private z(date: Date = new Date()): string {
        const start: Date = new Date(date.getFullYear(), 0, 0);
        const diff = (+date - +start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;

        return Math.floor(diff / oneDay).toString();
    }

    /**
     * ISO 8601 week number of year, weeks starting on Monday
     * Example: 42 (the 42nd week in the year)
     *
     * @param date The date object to use
     * @returns ISO 8601 week number of year, weeks starting on Monday
     */
    private W(date: Date = new Date()): string {
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((+date - +yearStart) / 86400000) + 1) / 7);
        return weekNo.toString();
    }

    /**
     * A full textual representation of a month, such as january or march, lowercase.
     * Example: january through december
     *
     * @param date The date object to use
     * @returns A full textual representation of a month, such as january or march, lowercase.
     */
    private F(date: Date = new Date()): string {
        return this.locale.month.full[date.getMonth()].toLowerCase();
    }

    /**
     * A full textual representation of a month, such as January or March, capitalized.
     * Example: january through december
     *
     * @param date The date object to use
     * @returns A full textual representation of a month, such as January or March, capitalized.
     */
    private f(date: Date = new Date()): string {
        return this.capitalize(this.F(date));
    }

    /**
     * Numeric representation of a month, with leading zeros
     * Example: 01 through 12
     *
     * @param date The date object to use
     * @returns Numeric representation of a month, with leading zeros
     */
    private m(date: Date = new Date()): string {
        const month = date.getMonth() + 1;
        return month < 10 ? `0${month}` : month.toString();
    }

    /**
     * A short textual representation of a month, short, lowercase
     * Example: jan through dec
     *
     * @param date The date object to use
     * @returns A short textual representation of a month, short, lowercase
     */
    private M(date: Date = new Date()): string {
        return this.locale.month.short[date.getMonth()].toLowerCase();
    }

    /**
     * Numeric representation of a month, without leading zeros
     * Example: 1 through 12
     *
     * @param date The date object to use
     * @returns Numeric representation of a month, without leading zeros
     */
    private n(date: Date = new Date()): string {
        return (date.getMonth() + 1).toString();
    }

    /**
     * Number of days in the given month
     * Example: 28 through 31
     *
     * @param date The date object to use
     * @returns Number of days in the given month
     */
    private t(date: Date = new Date()): string {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate().toString();
    }

    /**
     * Whether it's a leap year
     * Example: 1 if it is a leap year, 0 otherwise.
     *
     * @param date The date object to use
     * @returns Whether it's a leap year
     */
    private L(date: Date = new Date()): string {
        return (((date.getFullYear() % 4 === 0) && (date.getFullYear() % 100 != 0)) || (date.getFullYear() % 400 === 0)) ? "1" : "0";
    }

    /**
     * A full numeric representation of a year, 4 digits
     * Example: 1999 or 2003
     *
     * @param date The date object to use
     * @returns A full numeric representation of a year, 4 digits
     */
    private Y(date: Date = new Date()): string {
        return date.getFullYear().toString();
    }

    /**
     * A two digit representation of a year
     * Example: 99 or 03
     *
     * @param date The date object to use
     * @returns A two digit representation of a year
     */
    private y(date: Date = new Date()): string {
        return date.getFullYear().toString().slice(-2);
    }

    /**
     * Ante meridiem and Post meridiem, lowercase
     * Example: am or pm
     *
     * @param date The date object to use
     * @returns Ante meridiem and Post meridiem, lowercase
     */
    private a(date: Date = new Date()): string {
        return date.getHours() < 12 ? this.locale.meridiem.short[0].toLowerCase() : this.locale.meridiem.short[1].toLowerCase();
    }

    /**
     * Ante meridiem and Post meridiem, capitalized
     * Example: Am or Pm
     *
     * @param date The date object to use
     * @returns Ante meridiem and Post meridiem, capitalized
     */
    private A(date: Date = new Date()): string {
        return this.capitalize(this.a(date));
    }

    /**
     * Ante meridiem and Post meridiem, uppercase
     * Example: AM or PM
     *
     * @param date The date object to use
     * @returns Ante meridiem and Post meridiem, uppercase
     */
    private B(date: Date = new Date()): string {
        return this.a(date).toUpperCase();
    }

    /**
     * Ante meridiem and Post meridiem, uppercase
     * Example: ante meridiem or post meridiem
     *
     * @param date The date object to use
     * @returns Ante meridiem and Post meridiem, uppercase
     */
    private c(date: Date = new Date()): string {
        return date.getHours() < 12 ? this.locale.meridiem.full[0].toLowerCase() : this.locale.meridiem.full[1].toLowerCase();
    }

    /**
     * Ante meridiem and Post meridiem, capitalized
     * Example: Ante meridiem or Post meridiem
     *
     * @param date The date object to use
     * @returns Ante meridiem and Post meridiem, capitalized
     */
    private C(date: Date = new Date()): string {
        return this.capitalize(this.c(date));
    }

    /**
     * 12-hour format of an hour without leading zeros
     * Example: 1 through 12
     *
     * @param date The date object to use
     * @returns 12-hour format of an hour without leading zeros
     */
    private g(date: Date = new Date()): string {
        const hour = date.getHours();
        return hour < 12 ? hour.toString() : (hour - 12).toString();
    }

    /**
     * 24-hour format of an hour without leading zeros
     * Example: 0 through 23
     *
     * @param date The date object to use
     * @returns 24-hour format of an hour without leading zeros
     */
    private G(date: Date = new Date()): string {
        return date.getHours().toString();
    }

    /**
     * 12-hour format of an hour with leading zeros
     * Example: 01 through 12
     *
     * @param date The date object to use
     * @returns 12-hour format of an hour with leading zeros
     */
    private h(date: Date = new Date()): string {
        const hour = this.g(date);
        return hour.length === 1 ? `0${hour}` : hour;
    }

    /**
     * 24-hour format of an hour with leading zeros
     * Example: 00 through 23
     *
     * @param date The date object to use
     * @returns 24-hour format of an hour with leading zeros
     */
    private H(date: Date = new Date()): string {
        const hour = this.G(date);
        return hour.length === 1 ? `0${hour}` : hour;
    }

    /**
     * Minutes with leading zeros
     * Example: 00 to 59
     *
     * @param date The date object to use
     * @returns Minutes with leading zeros
     */
    private i(date: Date = new Date()): string {
        const minute = date.getMinutes().toString();
        return minute.length === 1 ? `0${minute}` : minute;
    }

    /**
     * Minutes without leading zeros
     * Example: 0 to 59
     *
     * @param date The date object to use
     * @returns Minutes without leading zeros
     */
    private I(date: Date = new Date()): string {
        return date.getMinutes().toString();
    }

    /**
     * Seconds with leading zeros.
     * Example: 00 through 59
     *
     * @param date The date object to use
     * @returns Seconds with leading zeros.
     */
    private s(date: Date = new Date()): string {
        const second = date.getSeconds().toString();
        return second.length === 1 ? `0${second}` : second;
    }

    /**
     * Seconds without leading zeros.
     * Example: 0 through 59
     *
     * @param date The date object to use
     * @returns Seconds without leading zeros.
     */
    private S(date: Date = new Date()): string {
        return date.getSeconds().toString();
    }

    /**
     * Milliseconds.
     * Example: 15 or 654
     *
     * @param date The date object to use
     * @returns Milliseconds.
     */
    private v(date: Date = new Date()): string {
        return date.getMilliseconds().toString();
    }

    /**
     * Milliseconds, 3 digits.
     * Example: 015 or 654
     *
     * @param date The date object to use
     * @returns Milliseconds, 3 digits.
     */
    private V(date: Date = new Date()): string {
        const millisecond = this.v(date);

        if(millisecond.length === 1) {
            return `00${millisecond}`;
        } else if(millisecond.length === 2) {
            return `0${millisecond}`;
        } else {
            return millisecond;
        }
    }

    /**
     * Seconds since the Unix Epoch
     * Example: 1639714248
     *
     * @param date The date object to use
     * @returns Seconds since the Unix Epoch
     */
    private U(date: Date = new Date()): string {
        return Math.floor(+date / 1000).toString();
    }
}

const x = new DateParser();
console.log(x.parse("Y-m-d H:i:s"));