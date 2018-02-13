import {Component, Input, OnInit} from '@angular/core';
import { Class, Session, Member } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-session-planner',
    templateUrl: './sessionPlanner.template.html'
})
export class SessionPlannerComponent implements OnInit {

    @Input() selectedClass: Class;
    selectedSession: Session;

    constructor(private transmitter: TransmitterService, private router: Router) {}

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
            }
        );
    }

    getRelation(member: Member, session: Session): String {
        let state: String;
        state = 'no Data';
        session.presences.forEach(element => {

            if ( element.member._id.toString() === member._id.toString()) {
                state = element.state;
            }
        });
        return state;
    }

    selectSession(session: Session) {
        this.selectedSession = session;
    }

    editSession() {
        this.transmitter.transmitSession(this.selectedSession);
        this.router.navigateByUrl('/session/edit');
    }

    addNewSession() {
        this.router.navigateByUrl('/session/new');
    }
}
