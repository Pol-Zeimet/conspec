import { Injectable } from '@angular/core';
import { error } from 'util';

@Injectable()
export class CustDate {
    private day: Number;
    private month: Number;
    private year: Number;

    constructor(day: Number, month: Number, year: Number ) {
        this.setDate(day, month, year);
    }

    setDate(day: Number, month: Number, year: Number ) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                if (day > 31) {
                    throw error('invalid Date');
                } else {
                    this.day = day;
                    this.month = month;
                    this.year = year;
                }
                break;
            }
            case 4:
            case 6:
            case 9:
            case 11: {
                if (day > 30) {
                    throw error('invalid Date');
                } else {
                    this.day = day;
                    this.month = month;
                    this.year = year;
                }
                break;
            }
            case 2: {
                if ((year.valueOf() % 4 === 0 && year.valueOf() % 100 !== 0) || year.valueOf() % 400 === 0) {
                    if (day > 29) {
                        throw error('invalid Date');
                    } else {
                        this.day = day;
                        this.month = month;
                        this.year = year;
                    }
                } else {
                    if (day > 28) {
                        throw error('invalid Date');
                    } else {
                        this.day = day;
                        this.month = month;
                        this.year = year;
                    }
                }
                break;
            }
            default: {
                throw error('invalid Date');
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
}

