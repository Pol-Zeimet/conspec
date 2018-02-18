import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SessionBuilderComponent} from './sessionBuilder.component';
import { SessionBuilderRoutingModule } from './sessionBuilder-routing.module';




@NgModule({
    declarations: [SessionBuilderComponent],
    imports: [

        CommonModule,
        FormsModule,
        SessionBuilderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class SessionBuilderModule {
}
