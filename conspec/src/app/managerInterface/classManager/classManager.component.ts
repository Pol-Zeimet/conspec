import { Component, OnInit } from "@angular/core";
import { TransmitterService } from "../../shared/services/transmitterService";
import { Class } from "../../shared/models";


@Component({
    selector: 'class-manager',
    templateUrl: './classManager.template.html'
})

export class ClassManagerComponent implements OnInit{
    
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