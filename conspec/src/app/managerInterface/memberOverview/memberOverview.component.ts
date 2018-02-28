import { Component, OnInit } from '@angular/core';
import { Member } from '../../shared/models';
import { MemberService } from '../../shared/services/memberService';
import { ClassesService } from '../../shared/services/classesService';
import { TransmitterService } from '../../shared/services/transmitterService';
import { Router } from '@angular/router';


@Component({
    selector: 'app-member-overview',
    templateUrl: './memberOverview.template.html'
})
export class MemberOverviewComponent implements OnInit {


    selectedMember: Member;
    members: Member[];

    constructor(
        private memberService: MemberService,
        private classesService: ClassesService,
        private transmitter: TransmitterService,
        private router: Router
    ) {
        this.members = new Array<Member>();
    }

    ngOnInit(): void {
        this.memberService.getAllMembers()
            .then(
                memberArray => this.members = memberArray
            );
    }

    select(member: Member) {
        this.selectedMember = member;
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

    createNewMember() {
        this.transmitter.transmitActiveClass(undefined);
        this.router.navigateByUrl('/member/new');
    }

    editMember() {
        this.transmitter.transmitActiveClass(undefined);
        this.transmitter.transmitMember(this.selectedMember);
        this.router.navigateByUrl('/member/edit');
    }

    deleteMember() {
        this.classesService.getAllClasses()
            .then(
                fetchedClasses => {
                    const classes = fetchedClasses;
                    const promise = new Promise<boolean>(
                        (resolve) => {
                            classes.forEach(
                                cl => {
                                    const memberIndex = cl.members.findIndex(member => {
                                        return member._id.toString() === this.selectedMember._id.toString();
                                    });
                                    if (memberIndex >= 0) {
                                        cl.members.splice(memberIndex, 1);
                                        cl.sessions.forEach(
                                            session => {
                                                const relationIndex = session.presences.findIndex(
                                                    relation => {
                                                        return relation.member._id.toString() === this.selectedMember._id.toString();
                                                    });
                                                if (relationIndex >= 0) {
                                                    session.presences.splice(relationIndex, 1);
                                                }
                                            });
                                        this.classesService.updateClass(cl);
                                    }
                                });
                            resolve();
                        }
                    ).then(
                        () => {
                            this.members.splice(this.members.indexOf(this.selectedMember), 1);
                            this.memberService.deleteMember(this.selectedMember)
                                .then(
                                    val => {
                                        this.selectedMember = undefined;
                                        this.transmitter.pokeListeners();
                                    }
                                );
                        }
                    );
                });
    }
}

