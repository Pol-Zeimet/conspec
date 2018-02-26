import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { CustDate } from '../../../shared/models/custDate';
import { Router } from '@angular/router';



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
                private router: Router) {
                }

    ngOnInit() {
        this.transmitter.transmittedSession$.subscribe(
            sessionData => {
                this.session = sessionData;
                this.day = this.session.date.day;
                this.month = this.session.date.month;
                this.year = this.session.date.year;
            }
        );
        this.transmitter.activeClass$.subscribe(
            classData => {
                this.selectedClass = classData;
            }
        );
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }


    saveSession() {
        try {

            const date = new CustDate();
            if (date.setDate(this.session.date.day, this.session.date.month, this.session.date.year)) {
                this.selectedClass.sessions.sort(
                    (session1, session2) => {
                        return session1.date.valueOf() - session2.date.valueOf();
                    });
                if (this.classesService.updateClass(this.selectedClass)) {
                    this.transmitter.transmitModifiedClass(this.selectedClass);
                }
                this.router.navigateByUrl('/class');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
