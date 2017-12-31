import {Component, Input, OnInit} from '@angular/core'
import { Class, Member } from '../../../shared/models/index';
import { TransmitterService } from '../../../shared/services/transmitterService';
import { Router } from '@angular/router';

@Component({
    selector: 'member-manager',
    templateUrl: './memberManager.template.html'
})
export class MemberManagerComponent implements OnInit{

    placesLeft: Number[]
    selectedClass:Class
    selectedMember: Member

    constructor(private transmitter: TransmitterService, private router: Router){
    }
    
    ngOnInit(){
        this.transmitter.transmittedClass$.subscribe(
            data => {
                this.selectedClass = data
                this.placesLeft = new Array<Number>(this.selectedClass.places - this.selectedClass.members.length).fill(0) 
            }
        )
    }

    select(member){
        this.selectedMember = member
    }

    editMember(){
        this.transmitter.transmitMember(this.selectedMember)
        this.router.navigateByUrl('/member')        
    }

    createNewMember(){
        this.transmitter.transmitMember(new Member())
        this.router.navigateByUrl('/member')
    }
}