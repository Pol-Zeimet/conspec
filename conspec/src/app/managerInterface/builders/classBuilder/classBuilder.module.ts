import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {ClassBuilderComponent} from './classBuilder.component';
import { ClassBuilderRoutingModule } from './classBuilder-routing.module';



@NgModule({
    declarations: [ClassBuilderComponent],
    imports: [
        CommonModule,
        FormsModule,
        ClassBuilderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ClassBuilderModule {
}
