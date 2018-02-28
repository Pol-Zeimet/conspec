import { Component, OnInit } from '@angular/core';
import { TransmitterService } from '../../shared/services/transmitterService';
import { Class } from '../../shared/models';
import { ClassesService } from '../../shared/services/classesService';
import { Router } from '@angular/router';


@Component({
    selector: 'app-class-manager',
    templateUrl: './classManager.template.html'
})

export class ClassManagerComponent implements OnInit {

    selectedClass: Class;

    constructor(private transmitter: TransmitterService,
                private classesService: ClassesService,
                private router: Router) {
    }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
                });
    }

    openModal(id: string) {
        const modal = document.getElementById(id);
        const span = document.getElementsByClassName('close')[0];
        modal.style.display = 'block';
    }

    closeModal(id: string) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
    }

    deleteClass() {
        this.classesService.deleteClass(this.selectedClass).then( val => {
            this.selectedClass = undefined;
            this.transmitter.pokeListeners();
        });
    }

    editClass() {
        this.router.navigateByUrl('class/edit');
    }


}
