import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { Class, Member } from "../models";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TransmitterService{
    
    private transmittedClass = new BehaviorSubject<Class>(new Class())
    transmittedClass$ = this.transmittedClass.asObservable()
    private transmittedMember = new BehaviorSubject<Member>(new Member())
    transmittedMember$ = this.transmittedMember.asObservable()


    transmitClass(transmittedClass: Class){
        this.transmittedClass.next(transmittedClass)
    }

    transmitMember(transmittedMember: Member){
        this.transmittedMember.next(transmittedMember)
    }
}