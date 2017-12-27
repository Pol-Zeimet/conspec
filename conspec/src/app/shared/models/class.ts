import {Member} from './member';
import {Session} from './session';
import {Injectable} from "@angular/core"

@Injectable()
export class Class{

    _id: String; 
    name:String;
    members: Member[];
    sessions: Session[];
    shedule: Date;

    constructor(){
        this._id = undefined; //will be assigned by db
        this.name = undefined;
        this.members = undefined;
        this.sessions = undefined;
        this.shedule = undefined;
    }
}