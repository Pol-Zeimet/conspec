import {Component, Input, OnInit} from '@angular/core';
import { Class, Member } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';
import { ClassesService } from '../../../shared/services/classesService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-member-manager',
    templateUrl: './memberManager.template.html'
})
export class MemberManagerComponent implements OnInit {

    placesLeft: Number[];
    selectedClass: Class;
    selectedMember: Member;

    constructor(
        private transmitter: TransmitterService,
        private router: Router,
        private classesService: ClassesService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
                this.placesLeft = new Array<Number>(this.selectedClass.places - this.selectedClass.members.length).fill(0);
            }
        );
    }

    select(member) {
        this.selectedMember = member;
    }

    editMember() {
        this.transmitter.transmitMember(this.selectedMember);
        this.router.navigateByUrl('/member/edit');
    }

    openModal(content) {
        this.modalService.open(content);
    }
    removeMember() {
        let index = this.selectedClass.members.indexOf(this.selectedMember);
        this.selectedClass.members.splice(index, 1);
        this.selectedClass.sessions.forEach(
            session => {
                index = session.presences.findIndex(
                    (relation) => {
                        return relation.member === this.selectedMember;
                    });
            session.presences.splice(index, 1);
            });
            this.placesLeft.push(0);
            if (this.classesService.updateClass(this.selectedClass)) {
                this.transmitter.transmitModifiedClass(this.selectedClass);
            }

        /*
        this.selectedClass.members.forEach( (member, memberIndex) => {
            if (member._id.toString() === this.selectedMember._id.toString()) {
                this.selectedClass.members.splice(memberIndex, 1);
                this.selectedClass.sessions.forEach( session => {
                    session.presences.forEach( (relation, relationIndex) => {
                        if (relation.member._id.toString() === this.selectedMember._id.toString()) {
                            session.presences.splice(relationIndex, 1);
                        }
                    });
                });
                if (this.classesService.updateClass(this.selectedClass)) {
                    this.transmitter.transmitModifiedClass(this.selectedClass);
                }                        }
            });
            */

    }
    createNewMember() {
        this.router.navigateByUrl('/member/new');
    }
}
