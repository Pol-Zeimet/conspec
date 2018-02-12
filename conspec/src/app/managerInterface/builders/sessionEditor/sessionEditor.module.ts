import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';



import {SessionEditorComponent} from './sessionEditor.component';
import { SessionEditorRoutingModule } from './sessionEditor-routing.module';



@NgModule({
    declarations: [SessionEditorComponent],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
        FormsModule,
        SessionEditorRoutingModule
    ],
    exports: [],
    providers: [],
})
export class SessionBuilderModule {
}
