import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberEditorComponent } from './memberEditor.component';


const routes: Routes = [
    {path: '',  component: MemberEditorComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberEditorRoutingModule {}
