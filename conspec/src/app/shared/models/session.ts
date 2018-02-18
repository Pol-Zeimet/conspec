
import { MemberSessionRelation } from './member-session-relation';
import {Injectable} from '@angular/core';
import { CustDate } from './custDate';


@Injectable()
export class Session {

    _id: String;
    date: CustDate;
    topic: String;
    presences: MemberSessionRelation[];

    constructor() {
        this._id = undefined;
        this.date = new CustDate(1, 1, 2000);
        this.presences = [];
        this.topic = '';
    }
}
