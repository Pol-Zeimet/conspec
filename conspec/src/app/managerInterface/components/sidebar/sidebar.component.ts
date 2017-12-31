import { Component, OnInit} from "@angular/core";
import { ClassesService } from "../../../shared/services/classesService";
import { Class, Member } from "../../../shared/models";
import { TransmitterService } from "../../../shared/services/transmitterService";
import { Router } from "@angular/router";

@Component({
    selector: 'manager-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: []
})

export class SidebarComponent implements OnInit {
    
    classes: Class[]
    activeClass:Class
    
    constructor(private classesService: ClassesService, private transmitter: TransmitterService, private router: Router) {
    }
    
    ngOnInit(){
        this.classes = this.loadAllClasses();
        this.transmitter.transmittedClass$.subscribe(
            data=> {
                if (data._id != undefined){
                    if(this.classes.find(function(cls){ return cls._id === data._id })){
                        this.classes = this.loadAllClasses()
                    } else {
                        this.classes.push(data)
                        this.selectClass(data)
                    }
                }
                
            }
        )
    }
    
    loadAllClasses(): Class[]{
        var allClasses = this.classesService.getAllClasses()
        if(allClasses){
            return allClasses
        } else {
            return []
        }
    }
    
    selectClass(selectedClass:Class){
        this.activeClass = selectedClass
        this.transmitter.transmitClass(selectedClass)
        this.router.navigateByUrl('/class')
    }

}