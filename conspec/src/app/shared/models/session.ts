
import { MemberSessionRelation } from './member-session-relation';
import {Injectable} from '@angular/core';

@Injectable()
export class Session {

    _id: String;
    date: Date;
    topic: String;
    presences: MemberSessionRelation[];

    constructor() {
        this._id = undefined;
        this.date = new Date('00/00/2000');
        this.presences = [];
        this.topic = '';
    }
}
