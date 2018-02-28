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
        }

        if (this.selectedClass.shedule === '') {
            valid = false;
        }
        if (this.selectedClass.places <= 0 ) {
            valid = false;
        }

        if (this.selectedClass.places < this.selectedClass.members.length) {
            valid = false;
        }

        if (valid) {
            if (this.classesService.updateClass(this.selectedClass)) {
                this.transmittter.transmitModifiedClass(this.selectedClass);
            }
            this.router.navigateByUrl('/class');
        }
    }
}
