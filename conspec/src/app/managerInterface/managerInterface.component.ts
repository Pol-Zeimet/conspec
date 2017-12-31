import { Component, OnInit } from '@angular/core';
import { TransmitterService } from '../shared/services/transmitterService';
import { Class } from '../shared/models/index';


@Component({
    selector: 'manager-interface',
    templateUrl: './managerInterface.template.html',
    styleUrls: []
})

export class ManagerInterfaceComponent implements OnInit{

    selectedClass: Class

    constructor(private transmitter: TransmitterService) {
    }
    
    ngOnInit(){
        this.transmitter.transmittedClass$.subscribe(
            data => {
                this.selectedClass = data
                })
    }

}