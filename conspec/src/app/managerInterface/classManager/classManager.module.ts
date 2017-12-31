import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import {ClassManagerComponent} from './classManager.component';
import { ClassManagerRoutingModule } from './classManager-routing.module';

import { SessionPlannerComponent } from '../components/sessionPlanner/sessionPlanner.component';
import { MemberManagerComponent } from '../components/memberManager/memberManager.component';



@NgModule({
    declarations: [ClassManagerComponent, SessionPlannerComponent, MemberManagerComponent],
    imports: [ 
        CommonModule, 
        ClassManagerRoutingModule,
        NgbModule
    ],
    exports: [],
    providers: [],
})
export class ClassManagerModule {
}