import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





import {SessionBuilderComponent} from './sessionBuilder.component';
import { SessionBuilderRoutingModule } from './sessionBuilder-routing.module';



@NgModule({
    declarations: [SessionBuilderComponent],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        SessionBuilderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class SessionBuilderModule {
}
