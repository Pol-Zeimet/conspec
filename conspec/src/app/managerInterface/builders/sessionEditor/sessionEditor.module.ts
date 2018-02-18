import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionEditorComponent } from './sessionEditor.component';
import { SessionEditorRoutingModule } from './sessionEditor-routing.module';




@NgModule({
    declarations: [SessionEditorComponent],
    imports: [

        CommonModule,
        FormsModule,
        SessionEditorRoutingModule
    ],
    exports: [],
    providers: []
})
export class SessionEditorModule {
}
