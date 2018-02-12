import {Injectable} from '@angular/core';
import { Member } from '.';


export class  MemberSessionRelation {
    state: String;
    member: Member;
    constructor( member: Member,  state: String) {
        this.state = state;
        this.member = member;
    }
}

