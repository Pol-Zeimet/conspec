import {Injectable} from "@angular/core"

@Injectable()
export class Member {
    
    name: String;
    lastName: String;
    _id:String;
    email: String;
    tel: String;
    verified: boolean;
    gotBonus: boolean;

    constructor(){
        this.name = undefined;
        this.lastName = undefined;
        this._id = undefined; //will be assigned by db
        this.tel = undefined;
        this.email = undefined;
        this.verified = false;
        this.gotBonus = false;

    }
}