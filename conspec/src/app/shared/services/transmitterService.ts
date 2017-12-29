import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { Class } from "../models";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TransmitterService{
    private transmittedClass = new Subject<Class>()
    transmittedClass$ = this.transmittedClass.asObservable()


    transmitClass(transmittedClass: Class){
        this.transmittedClass.next(transmittedClass)
    }


}