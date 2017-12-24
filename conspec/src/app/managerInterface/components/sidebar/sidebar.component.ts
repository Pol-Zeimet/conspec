import { Component } from "@angular/core";

@Component({
    selector: 'manager-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: []
})

export class SidebarComponent {
    
    constructor() {}

    isActive: boolean = false;
    showMenu: string = '';

    eventCalled() {
        this.isActive = !this.isActive;
    }
}