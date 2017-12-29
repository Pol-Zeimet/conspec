import { Component, OnInit} from "@angular/core";
import { ClassesService } from "../../../shared/services/classesService";
import { Class, Member } from "../../../shared/models";
import { TransmitterService } from "../../../shared/services/transmitterService";

@Component({
    selector: 'manager-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: []
})

export class SidebarComponent implements OnInit {
    
    int: number = 0;
    classes: Class[]
    activeClass:Class
    
    constructor(private classesService: ClassesService, private transmitter: TransmitterService) {
    }
    
    ngOnInit(){
        this.classes = new Array<Class>();
        this.classes = this.loadAllClasses();
    }

    addClass(){

        var newClass= new Class();
        newClass.name = 'Training' + this.int;
        this.int++;
        newClass = this.classesService.persistClass(newClass);
        this.classes.push(newClass); 
        console.log(this.classes)
        
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
        this.transmitter.transmitClass(this.activeClass)
    }

}