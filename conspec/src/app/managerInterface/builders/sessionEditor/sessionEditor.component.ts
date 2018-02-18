import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { Location } from '@angular/common';
import { CustDate } from '../../../shared/models/custDate';



@Component({
    selector: 'app-session-editor',
    templateUrl: './sessionEditor.template.html'
})

export class SessionEditorComponent implements OnInit {

    @Input() session: Session;
    @Input() day: Number;
    @Input() month: Number;
    @Input() year: Number;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService,
                private sessionService: SessionService,
                private classesService: ClassesService,
                private location: Location) {
                }

    ngOnInit() {
        this.transmitter.transmittedSession$.subscribe(
            sessionData => {
                this.session = sessionData as Session;
            }
        );
        this.transmitter.activeClass$.subscribe(
            classData => {
                this.selectedClass = classData as Class;
            }
        );
        this.day = this.session.date.getDay();
        this.month = this.session.date.getMonth();
        this.year = this.session.date.getYear();
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }


    saveSession() {
        try {
            this.session.date.setDate(this.day, this.month, this.year);
            this.sessionService.updateSession(this.session);
            this.selectedClass.sessions.sort(
                (session1, session2) => {
                     return session1.date.valueOf() - session2.date.valueOf();
                });
            if (this.classesService.updateClass(this.selectedClass)) {
                this.transmitter.transmitModifiedClass(this.selectedClass);
            }
            this.location.back();
        } catch (error) {
            console.log(error);
        }
    }
}
