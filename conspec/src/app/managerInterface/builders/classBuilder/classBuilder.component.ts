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

    newClass: Class;
    @Input() name: String;
    @Input() schedule: String;
    @Input() places: String;

    constructor(
        private transmittter: TransmitterService,
        private classesService: ClassesService,
        private router: Router,
        private location: Location) {
            this.name = '';
            this.schedule = '';
            this.places = '';
    }

    ngOnInit() {
        this.newClass = new Class();
    }

    goBack() {
        this.location.back();
    }

    checkName(): boolean {
        let isInvalid = false;
        if (this.name.length > 50 ) {
            document.getElementById('nameWarning2').style.display = 'block';
            isInvalid = true;
        } else {
            document.getElementById('nameWarning2').style.display = 'none';
            if (this.name.length < 1 ) {
                document.getElementById('nameWarning').style.display = 'block';
                isInvalid = true;
            } else {
                document.getElementById('nameWarning').style.display = 'none';
            }
        }
        return isInvalid;
    }

    checkschedule(): boolean {
        let isInvalid = false;
        if (this.schedule.length > 80) {
            isInvalid = true;
            document.getElementById('scheduleWarning2').style.display = 'block';
        } else {
            document.getElementById('scheduleWarning2').style.display = 'none';
            if (this.schedule.length < 1 ) {
                isInvalid = true;
                document.getElementById('scheduleWarning').style.display = 'block';
            } else {
                document.getElementById('scheduleWarning').style.display = 'none';
            }
        }
        return isInvalid;
    }

    checkPlaces(): boolean {
        let isInvalid = false;
        this.places += '';
        const placesAsNumber = +this.places;
        if (this.places.length > 2 || placesAsNumber > 40 || placesAsNumber < 1) {
            isInvalid = true;
            document.getElementById('placesWarning').style.display = 'block';
        } else {
            document.getElementById('placesWarning').style.display = 'none';
        }
        if (this.places.match('^[0-9]*$')) {
            document.getElementById('placesWarning2').style.display = 'none';
        } else {
            isInvalid = true;
            document.getElementById('placesWarning2').style.display = 'block';
        }
        return isInvalid;
    }

    createNewClass() {
        let valid = true;
        if (this.checkName()) {
            valid = false;
        }
        if (this.checkschedule()) {
            valid = false;
        }
        if (this.checkPlaces()) {
            valid = false;
        }
        if (valid) {
            this.newClass.name = this.name;
            this.newClass.schedule = this.schedule;
            this.newClass.places = +this.places;
            const persistedClass = this.classesService.persistClass(this.newClass);
            if (persistedClass) {
                this.transmittter.transmitAddedClass(persistedClass);
            }
            this.router.navigateByUrl('/class');
        }
    }
}

