import {Component} from '@angular/core'
import { TransmitterService } from '../../shared/services/transmitterService';
import { Class } from '../../shared/models';

@Component({
    selector: 'member-manager',
    templateUrl: './memberManager.template.html'
})
export class MemberManagerComponent{

    selectedClass: Class

    constructor(private transmitter: TransmitterService) {
        this.transmitter.transmittedClass$.subscribe(
            data => {
                this.selectedClass = data
                })
    }
}