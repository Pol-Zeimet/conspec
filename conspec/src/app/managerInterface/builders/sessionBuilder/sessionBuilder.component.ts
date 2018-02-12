import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';



@Component({
    selector: 'app-session-builder',
    templateUrl: './sessionBuilder.template.html'
})

export class SessionBuilderComponent implements OnInit {
    @Input() session: Session;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService) {
        this.session = new Session();
    }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
            }
        );
        this.selectedClass.members.forEach(member => {
            this.session.presences.push(new MemberSessionRelation(member, 'missing'));
        });
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }

    saveSession() {
    }
}
