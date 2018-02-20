import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {MemberOverviewComponent} from './memberOverview.component';
import { MemberOverviewRoutingModule } from './memberOverview-routing.module';



@NgModule({
    declarations: [MemberOverviewComponent],
    imports: [
        CommonModule,
        FormsModule,
        MemberOverviewRoutingModule
    ],
    exports: [],
    providers: [],
})
export class MemberOverviewModule {
}
