import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MemberBuilderComponent} from './memberBuilder.component';
import { MemberBuilderRoutingModule } from './memberBuilder-routing.module';



@NgModule({
    declarations: [MemberBuilderComponent],
    imports: [
        CommonModule,
        MemberBuilderRoutingModule,
        FormsModule
    ],
    exports: [],
    providers: [],
})
export class MemberBuilderModule {
}
