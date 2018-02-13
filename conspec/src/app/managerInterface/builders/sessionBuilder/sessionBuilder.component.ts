import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { Location } from '@angular/common';



@Component({
    selector: 'app-session-builder',
    templateUrl: './sessionBuilder.template.html'
})

export class SessionBuilderComponent implements OnInit {
    @Input() session: Session;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService,
                private sessionService: SessionService,
                private classesService: ClassesService,
                private location: Location) {
        this.session = new Session();
    }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
                this.selectedClass.members.forEach(member => {
                this.session.presences.push(new MemberSessionRelation(member, 'missing'));
                });
            }
        );
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }

    saveSession() {
        this.session = this.sessionService.persistSession(this.session);
        this.selectedClass.sessions.push(this.session);
        this.selectedClass.sessions.sort(
            (session1, session2) => {
                 return session1.date.valueOf() - session2.date.valueOf();
            });
        if (this.classesService.updateClass(this.selectedClass)) {
            this.transmitter.transmitModifiedClass(this.selectedClass);
        }
        this.location.back();
    }
}
