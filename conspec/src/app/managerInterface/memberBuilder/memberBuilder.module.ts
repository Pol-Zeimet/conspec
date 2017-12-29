import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MemberBuilderComponent} from './memberBuilder.component';
import { MemberBuilderRoutingModule } from './memberBuilder-routing.module';



@NgModule({
    declarations: [MemberBuilderComponent],
    imports: [ 
        CommonModule, 
        MemberBuilderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class MemberManagerModule {
}