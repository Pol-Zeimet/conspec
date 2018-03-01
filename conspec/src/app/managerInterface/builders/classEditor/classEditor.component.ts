import { Component, OnInit, Input} from '@angular/core';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { Class } from '../../../shared/models';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
    selector: 'app-class-editor',
    templateUrl: './classEditor.template.html'
})

export class ClassEditorComponent implements OnInit {

    @Input()
    selectedClass: Class;

    constructor(
        private transmittter: TransmitterService,
        private classesService: ClassesService,
        private router: Router,
        private location: Location) {
    }

    ngOnInit() {
        this.transmittter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
        });
    }

    goBack() {
        this.location.back();
    }

    saveClass() {
        let valid = true;
        if (this.selectedClass.name === '') {
            valid = false;
            document.getElementById('nameWarning').style.display = 'block';
        } else {
            document.getElementById('nameWarning').style.display = 'none';
        }

        if (this.selectedClass.shedule === '') {
            valid = false;
            document.getElementById('sheduleWarning').style.display = 'block';
        } else {
            document.getElementById('sheduleWarning').style.display = 'none';
        }
        if (this.selectedClass.places <= 0 ) {
            valid = false;
            document.getElementById('placesWarning').style.display = 'block';
        } else {
            document.getElementById('placesWarning').style.display = 'none';
        }

        if (this.selectedClass.places < this.selectedClass.members.length) {
            valid = false;
            document.getElementById('placesWarning2').style.display = 'block';
        } else {
            document.getElementById('placesWarning2').style.display = 'none';
        }

        if (valid) {
            if (this.classesService.updateClass(this.selectedClass)) {
                this.transmittter.transmitModifiedClass(this.selectedClass);
            }
            this.router.navigateByUrl('/class');
        }
    }
}
