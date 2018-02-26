import { Injectable } from '@angular/core';

@Injectable()
export class CustDate {
    private day: Number;
    private month: Number;
    private year: Number;

    constructor() {
        this.day = 1;
        this.month = 1;
        this.year = 2000;
    }


    setDate(day: Number, month: Number, year: Number): boolean {
        if (this.isValidDate) {
            this.day = day;
            this.month = month;
            this.year = year;
            return true;
        } else {
            return false;
        }
    }
    isValidDate(day: Number, month: Number, year: Number ): boolean {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                if (day > 31) {
                    return false;
                } else {
                    this.day = day;
                    this.month = month;
                    this.year = year;
                    return true;
                }
            }
            case 4:
            case 6:
            case 9:
            case 11: {
                if (day > 30) {
                    return false;
                } else {
                    this.day = day;
                    this.month = month;
                    this.year = year;
                    return true;
                }
            }
            case 2: {
                if ((year.valueOf() % 4 === 0 && year.valueOf() % 100 !== 0) || year.valueOf() % 400 === 0) {
                    if (day > 29) {
                        return false;
                    } else {
                        this.day = day;
                        this.month = month;
                        this.year = year;
                        return true;
                    }
                } else {
                    if (day > 28) {
                        return false;
                    } else {
                        this.day = day;
                        this.month = month;
                        this.year = year;
                        return true;
                    }
                }
            }
            default: {
                return false;
            }
        }
    }

    valueOf(): number {
        return this.day.valueOf()  + this.month.valueOf() + this.year.valueOf() ;
    }

    toString(): String {
        return this.day + '.' + this.month + '.' + this.year;
    }

    getDay(): Number {
        return this.day;
    }

    getMonth(): Number {
        return this.month;
    }

    getYear(): Number {
        return this.year;
    }

    setDay(day: Number) {
        this.day = day;
    }

    setMonth(month: Number) {
        this.month = month;
    }

    setYear(year: Number) {
        this.year = year;
    }
}

