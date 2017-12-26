import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionPlannerComponent} from './sessionPlanner.component';
import { SessionPlannerRoutingModule } from './sessionPlanner-routing.module';



@NgModule({
    declarations: [SessionPlannerComponent],
    imports: [ 
        CommonModule, 
        SessionPlannerRoutingModule
    ],
    exports: [],
    providers: [],
})
export class SessionPlannerModule {}