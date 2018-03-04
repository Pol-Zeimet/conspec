import { Component, Input, OnInit } from '@angular/core';
import { Member, Class } from '../../../shared/models';
import { MemberManagerComponent } from '../../components/memberManager/memberManager.component';
import { MemberService } from '../../../shared/services/memberService';
import {Location} from '@angular/common';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { ClassesService } from '../../../shared/services/classesService';
import { error } from 'util';


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

    goBack() {
        this.location.back();
    }

    checkInput(input: String, minlength, maxlength: number, isNumber: boolean, warningId: string): boolean {
        let isInvalid = false;
        if (input.length < minlength || input.length > maxlength || (isNumber && !input.match('^[0-9]*$'))) {
            isInvalid = true;
            document.getElementById(warningId).style.display = 'block';
        } else {
            document.getElementById(warningId).style.display = 'none';
        }
        return isInvalid;
    }

    saveMember() {
        let valid = true;
        if (this.checkInput(this.member.name, 1, 25, false, 'nameWarning')) {
            valid = false;
        }

        if (this.checkInput(this.member.lastName, 1, 25, false, 'lastNameWarning')) {
            valid = false;
        }

        if (this.checkInput(this.member.email, 0, 30, false, 'emailWarning')) {
            valid = false;
        }

        if (this.checkInput(this.member.tel, 0, 30, true, 'phoneWarning')) {
            valid = false;
        }

        if (valid) {
        this.memberservice.updateMember(this.member);
        if (this.selectedClass !== undefined) {
            if (this.classesService.updateClass(this.selectedClass)) {
                this.transmitter.transmitModifiedClass(this.selectedClass);
            }
        }
        this.location.back();
        }
    }
}
