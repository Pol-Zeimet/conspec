import { Component, Input, OnInit } from '@angular/core';
import { Member, Class } from '../../../shared/models';
import { MemberManagerComponent } from '../../components/memberManager/memberManager.component';
import { MemberService } from '../../../shared/services/memberService';
import {Location} from '@angular/common';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';


@Component({
    selector: 'app-member-editor',
    templateUrl: './memberEditor.template.html'
})

export class MemberEditorComponent implements OnInit {

    @Input() member: Member;
    private selectedClass: Class;

    constructor (
        private memberservice: MemberService,
        private classesService: ClassesService,
        private location: Location,
        private transmitter: TransmitterService
                ) {}

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => this.selectedClass = data
        );
        this.transmitter.transmittedMember$.subscribe(
            data => this.member = data
        );
    }

    saveMember() {
        this.memberservice.updateMember(this.member);
        if (this.classesService.updateClass(this.selectedClass)) {
            this.transmitter.transmitModifiedClass(this.selectedClass);
        }
        this.location.back();
    }
}
