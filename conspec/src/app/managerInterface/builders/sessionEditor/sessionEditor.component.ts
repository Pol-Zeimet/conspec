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
    @Input() day: String;
    @Input() month: String;
    @Input() year: String;
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
                this.day = this.session.date.day.toString();
                this.month = this.session.date.month.toString();
                this.year = this.session.date.year.toString();
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

    checkInput(input: String): boolean {
        input += '';
        if (input.length <= 4 && input.length > 0 && input.match('^[0-9]*$')) {
            return true;
        }
        return false;
    }

    saveSession() {
        if (this.checkInput(this.day) && this.checkInput(this.month) && this.checkInput(this.year)) {
                const date = new CustDate();
                if (date.setDate(+this.day, +this.month, +this.year)) {
                    this.session.date = date;
                    this.selectedClass.sessions.sort(
                        (session1, session2) => {
                            const yearDiff = session1.date.year.valueOf() - session2.date.year.valueOf();
                            const monthDiff = session1.date.month.valueOf() - session2.date.month.valueOf();
                            const dayDiff = session1.date.day.valueOf() - session2.date.day.valueOf();
                            if ( yearDiff !== 0) {
                                return yearDiff;
                            } else if (monthDiff !== 0) {
                                return monthDiff;
                            } else {
                                return dayDiff;
                            }
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

