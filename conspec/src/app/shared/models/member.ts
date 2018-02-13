import {Injectable} from '@angular/core';

@Injectable()
export class Member {

    name: String;
    lastName: String;
    _id: String;
    email: String;
    tel: String;
    verified: boolean;
    gotBonus: boolean;

    constructor() {
        this.name = '';
        this.lastName = '';
        this._id = undefined; // will be assigned by db
        this.tel = '';
        this.email = '';
        this.verified = false;
        this.gotBonus = false;

    }
}
