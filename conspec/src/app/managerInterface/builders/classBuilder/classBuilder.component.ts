import { Component, OnInit, Input} from '@angular/core';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { Class } from '../../../shared/models';
import { Location } from '@angular/common';



@Component({
    selector: 'app-class-builder',
    templateUrl: './classBuilder.template.html'
})

export class ClassBuilderComponent implements OnInit {

    @Input()
    newClass: Class;

    constructor(private transmittter: TransmitterService, private classesService: ClassesService,  private location: Location) {

    }

    ngOnInit() {
        this.newClass = new Class();
    }


    createNewClass() {
        if ((this.newClass.name !== '') &&  (this.newClass.shedule !== '')) {
            const persistedClass = this.classesService.persistClass(this.newClass);
            if (persistedClass) {
                this.transmittter.transmitAddedClass(persistedClass);
            } else {
                console.log('something somewhere somehow went terribly wrong');
            }
            this.location.back();
        }
    }
}
