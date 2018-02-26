import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { CustDate } from '../../../shared/models/custDate';
import { Router } from '@angular/router';


@Component({
    selector: 'app-session-builder',
    templateUrl: './sessionBuilder.template.html',

})

export class SessionBuilderComponent implements OnInit {
    @Input() session: Session;
    @Input() day: Number;
    @Input() month: Number;
    @Input() year: Number;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService,
                private sessionService: SessionService,
                private classesService: ClassesService,
                private router: Router) {
                    this.day = 1;
                    this.month = 1;
                    this.year = 2000;
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

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }


    saveSession() {
        if (this.day && this.month && this.year) {
            try {

                if (this.session.date.setDate(this.day, this.month, this.year)) {
                    this.selectedClass.sessions.push(this.session);
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
}
