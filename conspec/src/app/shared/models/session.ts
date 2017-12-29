
import { Member } from "./member";
import {Injectable} from "@angular/core"

@Injectable()
export class Session{
  
    date: Date;
    topic: String;
    participants: Member[];

    constructor(){
        this.date = new Date('00/00/2000');
        this.participants = [];
        this.topic = '';
    }
}