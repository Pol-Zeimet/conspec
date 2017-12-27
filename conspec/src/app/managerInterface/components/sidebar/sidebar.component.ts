import { Component, OnInit} from "@angular/core";
import { ClassesService } from "../../../shared/services/classesService";
import { Class, Member } from "../../../shared/models";

@Component({
    selector: 'manager-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: []
})

export class SidebarComponent implements OnInit {
    
    int: number = 0;
    classes: Class[];
    
    constructor(private classesService: ClassesService) {
    }
    
    ngOnInit(){
        this.classes = new Array<Class>();
    }

    addClass(){

        var newClass= new Class();
        newClass.name = 'Training' + this.int;
        this.int++;
        newClass = this.classesService.persistClass(newClass);
        this.classes.push(newClass); 
        
    }

}