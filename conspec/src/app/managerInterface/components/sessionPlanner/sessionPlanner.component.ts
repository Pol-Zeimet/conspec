import {Component, Input, OnInit} from '@angular/core';
import { Class, Session, Member } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';
import { ClassesService } from '../../../shared/services/classesService';
import { SessionService } from '../../../shared/services/sessionService';
import { CustDate } from '../../../shared/models/custDate';

@Component({
    selector: 'app-session-planner',
    templateUrl: './sessionPlanner.template.html'
})
export class SessionPlannerComponent implements OnInit {

    selectedClass: Class;
    selectedSession: Session;

    constructor(
        private transmitter: TransmitterService,
        private router: Router,
        private classesService: ClassesService) {
    }

    getDate(session: Session): string {
        const date = new CustDate();
        date.setDate(session.date.day, session.date.month, session.date.year);
        return date.toString();
    }

    ngOnInit() {
            this.transmitter.activeClass$.subscribe(
                data => {
                    if (data) {
                        console.log(data);
                        this.selectedClass = data;
                    }
                }
            );
    }

    getRelation(member: Member, session: Session): String {
        let state: String;
        state = 'no Data';
        if ( member._id !== undefined ) {
            session.presences.forEach(relation => {
                if ( relation.member._id.toString() === member._id.toString()) {
                    state = relation.state;
                }
            });
        }
        return state;
    }


    selectSession(session: Session) {
        this.selectedSession = session as Session;
    }

    deleteSession() {
        const index = this.selectedClass.sessions.indexOf(this.selectedSession);
        this.selectedClass.sessions.splice(index, 1);
        if (this.classesService.updateClass(this.selectedClass)) {
            this.transmitter.transmitModifiedClass(this.selectedClass);
        }
    }

    openModal(id: string) {
        const modal = document.getElementById(id);
        modal.style.display = 'block';
    }

    closeModal(id: string) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
    }

    editSession() {
        this.transmitter.transmitSession(this.selectedSession);
        this.router.navigateByUrl('/session/edit');
    }

    addNewSession() {
        this.router.navigateByUrl('/session/new');
    }
}
