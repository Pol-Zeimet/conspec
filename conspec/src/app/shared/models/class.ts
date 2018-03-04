import {Member} from './member';
import {Session} from './session';
import {Injectable} from '@angular/core';

@Injectable()
export class Class {

    _id: String;
    name: String;
    members: Member[];
    sessions: Session[];
    schedule: String;
    places: number;

    constructor() {
        this._id = undefined; // will be assigned by db
        this.name = '';
        this.members = [];
        this.sessions = [];
        this.schedule = '';
        this.places = 1;
    }
}
