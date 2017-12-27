
import { Member } from "./member";
import {Injectable} from "@angular/core"

@Injectable()
export class Session{
  
    date: Date;
    topic: String;
    participants: Member[];

    constructor(){
        this.date = undefined;
        this.participants = undefined;
        this.topic = undefined;
    }
}