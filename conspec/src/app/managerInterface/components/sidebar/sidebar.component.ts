import { Component, OnInit} from '@angular/core';
import { ClassesService } from '../../../shared/services/classesService';
import { Class, Member } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manager-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: []
})

export class SidebarComponent implements OnInit {

    classes: Class[];
    activeClass: Class;

    constructor(private classesService: ClassesService, private transmitter: TransmitterService, private router: Router) {
        this.loadAllClasses();
        if (this.classes.length > 0) {
            this.selectClass(this.classes[0]);
        }
    }

    ngOnInit() {
        this.transmitter.addedClass$.subscribe(
            data => {
                if (data) {
                    this.classes.push(data);
                    this.selectClass(data);
                }
            });
        this.transmitter.modifiedClass$.subscribe(
            data => {
                    this.loadAllClasses();
                    this.selectClass(this.classes.find(
                    element => element._id.toString() === data._id.toString()
                    ));
            });
    }

    loadAllClasses() {
        this.classes = this.classesService.getAllClasses();
    }

    selectClass(selectedClass: Class) {
        this.activeClass = selectedClass;
        this.transmitter.transmitActiveClass(selectedClass);
        this.router.navigateByUrl('/class');
    }

}
