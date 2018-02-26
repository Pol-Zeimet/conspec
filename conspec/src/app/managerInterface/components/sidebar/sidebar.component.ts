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
        this.classes = new Array<Class>();
    }

    ngOnInit() {
        this.classesService.getAllClasses()
            .then(fetchedClasses => this.classes = fetchedClasses)
            .then(() => {
                this.transmitter.addedClass$.subscribe(
                    data => {
                        if (data) {
                            this.classes.push(data);
                            this.selectClass(data);
                        }
                    });
                    this.transmitter.modifiedClass$.subscribe(
                        data => {
                            if (data && data._id) {
                                this.loadAllClasses();
                                this.selectClass(this.classes.find(
                                    element => element._id.toString() === data._id.toString()
                                ));
                            }
                        });
                        this.transmitter.poke$.subscribe(
                            data => {
                                this.classesService.getAllClasses()
                                .then(fetchedClasses => this.classes = fetchedClasses);
                            }
                        );
                    });
                }

    loadAllClasses() {
        this.classesService.getAllClasses()
        .then(fetchedClasses => this.classes = fetchedClasses);
    }

    selectClass(selectedClass: Class) {
        this.activeClass = selectedClass;
        this.transmitter.transmitActiveClass(selectedClass);
        this.router.navigateByUrl('/class');
    }

}
