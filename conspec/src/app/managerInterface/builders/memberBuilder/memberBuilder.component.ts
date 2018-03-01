import { Component, Input, OnInit } from '@angular/core';
import { Member, Class, MemberSessionRelation } from '../../../shared/models';
import { MemberManagerComponent } from '../../components/memberManager/memberManager.component';
import { MemberService } from '../../../shared/services/memberService';
import {Location} from '@angular/common';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';
import { Router } from '@angular/router';
import { LoggerService } from '../../../shared/services/loggerService';


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
        private transmitter: TransmitterService,
                ) {
                    this.member = new Member();
                }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => this.selectedClass = data
        );
    }

    goBack() {
        this.location.back();
    }

    saveMember() {
        let valid = true;
        if (this.member.name === '') {
            valid = false;
            document.getElementById('nameWarning').style.display = 'block';
        } else {
            document.getElementById('nameWarning').style.display = 'none';
        }

        if (this.member.lastName === '') {
            valid = false;
            document.getElementById('lastNameWarning').style.display = 'block';
        } else {
            document.getElementById('lastNameWarning').style.display = 'none';
        }

        if (valid) {
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
                }
                this.location.back();
            });
        }
    }
}
