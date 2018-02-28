import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {ClassEditorComponent} from './classEditor.component';
import { ClassEditorRoutingModule } from './classEditor-routing.module';



@NgModule({
    declarations: [ClassEditorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ClassEditorRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ClassEditorModule {
}
