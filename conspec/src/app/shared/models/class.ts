import {Member} from './member';
import {Session} from './session';
import {Injectable} from '@angular/core';

@Injectable()
export class Class {

    _id: String;
    name: String;
    members: Member[];
    sessions: Session[];
    shedule: String;
    places: number;

    constructor() {
        this._id = undefined; // will be assigned by db
        this.name = '';
        this.members = [];
        this.sessions = [];
        this.shedule = '';
        this.places = 1;
    }
}
