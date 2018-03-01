import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { CustDate } from '../../../shared/models/custDate';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerService } from '../../../shared/services/loggerService';



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
                private router: Router,
                private location: Location) {
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

    goBack() {
        this.location.back();
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }


    saveSession() {
        if (this.day > 0 && this.month > 0 && this.year > 0) {
                const date = new CustDate();
                if (date.setDate(this.day, this.month, this.year)) {
                    this.session.date = date;
                    this.selectedClass.sessions.sort(
                        (session1, session2) => {
                            return session1.date.valueOf() - session2.date.valueOf();
                        });
                    if (this.classesService.updateClass(this.selectedClass)) {
                        this.transmitter.transmitModifiedClass(this.selectedClass);
                    }
                    this.router.navigateByUrl('/class');
                }  else {
                    document.getElementById('dateWarning').style.display = 'block';
                }
        } else {
            document.getElementById('dateWarning').style.display = 'block';
        }
    }
}

