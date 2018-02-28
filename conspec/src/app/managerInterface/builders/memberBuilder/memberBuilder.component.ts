import { Component, Input, OnInit } from '@angular/core';
import { Member, Class, MemberSessionRelation } from '../../../shared/models';
import { MemberManagerComponent } from '../../components/memberManager/memberManager.component';
import { MemberService } from '../../../shared/services/memberService';
import {Location} from '@angular/common';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { Router } from '@angular/router';


@Component({
    selector: 'app-member-builder',
    templateUrl: './memberBuilder.template.html'
})

export class MemberBuilderComponent implements OnInit {

    @Input() member: Member;
    private selectedClass: Class;

    constructor (
        private memberservice: MemberService,
        private classesService: ClassesService,
        private location: Location,
        private transmitter: TransmitterService
                ) {
                    this.member = new Member();
                }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => this.selectedClass = data
        );
    }

    saveMember() {
        this.memberservice.persistMember(this.member)
        .then( (member) => this.member = member, (member) => this.member = member)
        .then(() => {
            if (this.member._id !== undefined) {
                if (this.selectedClass !== undefined) {
                    this.selectedClass.members.push(this.member);
                    this.selectedClass.sessions.forEach(session => {
                        session.presences.push(new MemberSessionRelation(this.member, 'no Data'));
                    });
                    if (this.classesService.updateClass(this.selectedClass)) {
                        this.transmitter.transmitModifiedClass(this.selectedClass);
                    }
                }
            } else {
                console.log('could not save Member');
            }
            this.location.back();
        });
    }
}
