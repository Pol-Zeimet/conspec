import { Component, OnInit, Input } from '@angular/core';
import { Session, Class, MemberSessionRelation } from '../../../shared/models';
import { TransmitterService } from '../../../shared/services/transmitterService';



@Component({
    selector: 'app-session-editor',
    templateUrl: './sessionEditor.template.html'
})

export class SessionEditorComponent implements OnInit {

    @Input() session: Session;
    private selectedClass: Class;

    constructor(private transmitter: TransmitterService) {
    }

    ngOnInit() {
    }

    setState(relation: MemberSessionRelation, state: String) {
        relation.state = state;
    }

    saveSession() {

    }
}
