import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { CustDate } from '../../../shared/models/custDate';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-session-builder',
    templateUrl: './sessionBuilder.template.html',

})

export class SessionBuilderComponent implements OnInit {
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
                    this.day = '';
                    this.month = '';
                    this.year = '';
    }

    ngOnInit() {
        const promise = new Promise<any>((resolve) => {
            this.transmitter.activeClass$.subscribe(
                data => {
                    this.session = new Session();
                    this.selectedClass = data;
                    this.selectedClass.members.forEach(member => {
                        if (this.session.presences.find(relation => {
                            return relation.member._id.toString() === member._id.toString();
                        }) === undefined) {
                            this.session.presences.push(new MemberSessionRelation(member, 'no Data'));
                        }
                    });
                    resolve();
                }
            );
        });
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
                if (this.session.date.setDate(+this.day, +this.month, +this.year)) {
                    this.selectedClass.sessions.push(this.session);
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
                } else {
                    document.getElementById('dateWarning').style.display = 'block';
                }
        } else {
            document.getElementById('dateWarning').style.display = 'block';
        }
    }
}

