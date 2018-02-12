import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionEditorComponent } from './sessionEditor.component';


const routes: Routes = [
    {path: '',  component: SessionEditorComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SessionEditorRoutingModule {}
