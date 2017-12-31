import {Component, Input} from '@angular/core'
import { Class } from '../../../shared/models/index';

@Component({
    selector: 'session-planner',
    templateUrl: './sessionPlanner.template.html'
})
export class SessionPlannerComponent{

    @Input() selectedClass:Class

    constructor(){}
}