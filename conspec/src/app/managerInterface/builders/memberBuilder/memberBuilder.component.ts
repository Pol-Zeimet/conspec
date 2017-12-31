import { Component, Input, OnInit } from "@angular/core";
import { Member, Class } from "../../../shared/models";
import { MemberManagerComponent } from "../../components/memberManager/memberManager.component";
import { MemberService } from "../../../shared/services/memberService";
import {Location} from '@angular/common';
import { TransmitterService } from "../../../shared/services/transmitterService";
import { ClassesService } from "../../../shared/services/classesService";


@Component({
    selector: 'member-builder',
    templateUrl: './memberBuilder.template.html'
})

export class MemberBuilderComponent implements OnInit{

    @Input() member: Member
    private selectedClass: Class

    constructor(private memberservice: MemberService, private classesService: ClassesService, private location: Location, private transmitter: TransmitterService){
    }

    ngOnInit(){
        this.transmitter.transmittedClass$.subscribe(
            data => this.selectedClass = data      
        )
        this.transmitter.transmittedMember$.subscribe(
            data=> this.member = data
        )
    }

    saveMember(){
        if (this.member._id){
            this.updateMember()
        }
        else {
            this.createNewMember()
        }
    }

    updateMember(){
        this.memberservice.updateMember(this.member)
        if (this.classesService.updateClass(this.selectedClass)){
            this.transmitter.transmitClass(this.selectedClass)
        }
        this.location.back()
    }

    createNewMember(){
        this.member = this.memberservice.persistMember(this.member)
        this.selectedClass.members.push(this.member)
        if (this.classesService.updateClass(this.selectedClass)){
            this.transmitter.transmitClass(this.selectedClass)
        }
        this.location.back()
    }
    
}