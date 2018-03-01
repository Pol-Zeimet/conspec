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
        let valid = true;
        if (this.newClass.name === '') {
            valid = false;
            document.getElementById('nameWarning').style.display = 'block';
        } else {
            document.getElementById('nameWarning').style.display = 'none';
        }

        if (this.newClass.shedule === '') {
            valid = false;
            document.getElementById('sheduleWarning').style.display = 'block';
        } else {
            document.getElementById('sheduleWarning').style.display = 'none';
        }
        if (this.newClass.places <= 0 ) {
            valid = false;
            document.getElementById('placesWarning').style.display = 'block';
        } else {
            document.getElementById('placesWarning').style.display = 'none';
        }

        if (valid) {
            const persistedClass = this.classesService.persistClass(this.newClass);
            if (persistedClass) {
                this.transmittter.transmitAddedClass(persistedClass);
            }
            this.router.navigateByUrl('/class');
        }
    }
}
