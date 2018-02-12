import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';



import {SessionBuilderComponent} from './sessionBuilder.component';
import { SessionBuilderRoutingModule } from './sessionBuilder-routing.module';



@NgModule({
    declarations: [SessionBuilderComponent],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
        FormsModule,
        SessionBuilderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class SessionBuilderModule {
}
