import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { SessionService } from '../../../shared/services/sessionService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { Location } from '@angular/common';



@Component({
    selector: 'app-session-editor',
    templateUrl: './sessionEditor.template.html'
})

export class SessionEditorComponent implements OnInit {

    @Input() session: Session;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService,
                private sessionService: SessionService,
                private classesService: ClassesService,
                private location: Location) {}

    ngOnInit() {
        this.transmitter.transmittedSession$.subscribe(
            data => {
                this.session = data as Session;
            }
        );
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data as Class;
                this.selectedClass.members.forEach(member => {
                    this.session.presences.push(new MemberSessionRelation(member, 'missing'));
                });
            });
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }

    saveSession() {
        this.sessionService.updateSession(this.session);
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
