import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MemberEditorComponent} from './memberEditor.component';
import { MemberEditorRoutingModule } from './memberEditor-routing.module';



@NgModule({
    declarations: [MemberEditorComponent],
    imports: [
        CommonModule,
        MemberEditorRoutingModule,
        FormsModule
    ],
    exports: [],
    providers: [],
})
export class MemberEditorModule {
}
