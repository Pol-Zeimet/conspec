import {Component, Input, OnInit} from '@angular/core';
import { Class } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-session-planner',
    templateUrl: './sessionPlanner.template.html'
})
export class SessionPlannerComponent implements OnInit {

    @Input() selectedClass: Class;

    constructor(private transmitter: TransmitterService, private router: Router) {}

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
            }
        );
    }

    addNewSession() {
        this.router.navigateByUrl('/session/new');
    }
}
