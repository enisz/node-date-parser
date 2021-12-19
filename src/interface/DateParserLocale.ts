export interface DateParserLocale {
    month: {
        full: string[];
        short: string[];
    };

    day: {
        full: string[];
        short: string[];
    };

    meridiem: {
        full: string[];
        short: string[];
    };
}