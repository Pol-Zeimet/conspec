import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Class, Member } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TransmitterService {

    private activeClass = new BehaviorSubject<Class>(new Class());
    activeClass$ = this.activeClass.asObservable();

    private addedClass = new BehaviorSubject<Class>(new Class());
    addedClass$ = this.addedClass.asObservable();

    private modifiedClass = new BehaviorSubject<Class>(new Class());
    modifiedClass$ = this.modifiedClass.asObservable();

    private transmittedMember = new BehaviorSubject<Member>(new Member());
    transmittedMember$ = this.transmittedMember.asObservable();



    transmitActiveClass(activeClass: Class) {
        this.activeClass.next(activeClass);
    }

    transmitModifiedClass(modifiedClass: Class) {
        this.modifiedClass.next(modifiedClass);
    }

    transmitAddedClass(addedClass: Class) {
        this.addedClass.next(addedClass);
    }

    transmitMember(transmittedMember: Member) {
        this.transmittedMember.next(transmittedMember);
    }
}
