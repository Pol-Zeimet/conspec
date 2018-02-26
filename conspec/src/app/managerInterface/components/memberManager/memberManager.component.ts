import {Component, Input, OnInit} from '@angular/core';
import { Class, Member, MemberSessionRelation } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';
import { ClassesService } from '../../../shared/services/classesService';
import { MemberService } from '../../../shared/services/memberService';




@Component({
    selector: 'app-member-manager',
    templateUrl: './memberManager.template.html'
})
export class MemberManagerComponent implements OnInit {

    placesLeft: Number[];
    selectedClass: Class;
    selectedMember: Member;
    availableMembers: Member[];
    existingMember: Member;

    constructor(
        private transmitter: TransmitterService,
        private router: Router,
        private classesService: ClassesService,
        private memberService: MemberService) {
        this.availableMembers = new Array<Member>();
        this.placesLeft = new Array<Number>();
    }

    ngOnInit() {
        this.transmitter.activeClass$.subscribe(
            data => {
                this.selectedClass = data;
                this.placesLeft = new Array<Number>(this.selectedClass.places - this.selectedClass.members.length).fill(0);
                this.getAvailableMembers().then(members => this.availableMembers = members);
            }
        );
    }

    getAvailableMembers(): Promise<Member[]> {
        const promise = new Promise<Member[]>((reveal) => {
            let array;
            this.memberService.getAllMembers()
            .then(
                memberArray => {
                    this.selectedClass.members.forEach(
                        member => {
                            memberArray.splice(memberArray.findIndex(
                                listMember => {
                                    return listMember._id.toString() === member._id.toString();
                                }), 1);
                            });
                            array = memberArray;
                        }
                    )
            .then( () => reveal(array));
                });
        return promise;
    }

    select(member: Member) {
        this.selectedMember = member;
    }

    addNew() {
        this.placesLeft.pop();
        this.selectedClass.members.push(this.existingMember);

        this.selectedClass.sessions.forEach(session => {
            session.presences.push(new MemberSessionRelation(this.existingMember, 'no Data'));
        });

        const index = this.availableMembers.indexOf(this.existingMember);
        this.availableMembers.splice(index, 1);


        this.existingMember = undefined;

        if (this.classesService.updateClass(this.selectedClass)) {
            this.transmitter.transmitModifiedClass(this.selectedClass);
        }

    }


    editMember() {
        this.transmitter.transmitMember(this.selectedMember);
        this.router.navigateByUrl('/member/edit');
    }

    openModal(id: string) {
        const modal = document.getElementById(id);
        const span = document.getElementsByClassName('close')[0];
        modal.style.display = 'block';
    }

    closeModal(id: string) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
    }

    removeMemberFromClass() {
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
    }

    createNewMember() {
        this.router.navigateByUrl('/member/new');
    }
}
