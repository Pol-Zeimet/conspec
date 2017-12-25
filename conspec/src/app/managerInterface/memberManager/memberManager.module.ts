import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MemberManagerComponent} from './memberManager.component';
import { MemberManagerRoutingModule } from './memberManager-routing.module';



@NgModule({
    declarations: [MemberManagerComponent],
    imports: [ 
        CommonModule, 
        MemberManagerRoutingModule
    ],
    exports: [],
    providers: [],
})
export class MemberManagerModule {}