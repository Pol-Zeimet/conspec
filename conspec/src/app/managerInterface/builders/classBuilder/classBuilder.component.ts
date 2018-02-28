import { Component, OnInit, Input} from '@angular/core';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { Class } from '../../../shared/models';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
    selector: 'app-class-builder',
    templateUrl: './classBuilder.template.html'
})

export class ClassBuilderComponent implements OnInit {

    @Input()
    newClass: Class;

    constructor(
        private transmittter: TransmitterService,
        private classesService: ClassesService,
        private router: Router,
        private location: Location) {

    }

    ngOnInit() {
        this.newClass = new Class();
    }

    goBack() {
        this.location.back();
    }


    createNewClass() {
        if ((this.newClass.name !== '') &&  (this.newClass.shedule !== '')  &&  (this.newClass.places > 0 ) ) {
            const persistedClass = this.classesService.persistClass(this.newClass);
            if (persistedClass) {
                this.transmittter.transmitAddedClass(persistedClass);
            } else {
                console.log('something somewhere somehow went terribly wrong');
            }
            this.router.navigateByUrl('/class');
        }
    }
}
