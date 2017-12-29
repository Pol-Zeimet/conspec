import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ClassManagerComponent} from './classManager.component';
import { ClassManagerRoutingModule } from './classManager-routing.module';



@NgModule({
    declarations: [ClassManagerComponent],
    imports: [ 
        CommonModule, 
        ClassManagerRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ClassManagerModule {
}