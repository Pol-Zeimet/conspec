import {Component, Input, OnInit} from '@angular/core';
import { Class, Session, Member } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from '../../../shared/services/classesService';
import { SessionService } from '../../../shared/services/sessionService';

@Component({
    selector: 'app-session-planner',
    templateUrl: './sessionPlanner.template.html'
})
export class SessionPlannerComponent implements OnInit {

    @Input() selectedClass: Class;
    selectedSession: Session;

    constructor(
        private transmitter: TransmitterService,
        private router: Router,
        private modalService: NgbModal,
        private classesService: ClassesService,
        private sessionService: SessionService) {
    }

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
        this.selectedSession = session;
    }

    deleteSession() {
        const index = this.selectedClass.sessions.indexOf(this.selectedSession);
        this.selectedClass.sessions.splice(index, 1);
        if (this.classesService.updateClass(this.selectedClass)) {
            this.transmitter.transmitModifiedClass(this.selectedClass);
        }
        if (this.sessionService.deleteSession(this.selectedSession)) {
            this.selectedSession = undefined;
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
