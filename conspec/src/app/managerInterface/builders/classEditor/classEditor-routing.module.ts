import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassEditorComponent } from './classEditor.component';


const routes: Routes = [
    {path: '',  component: ClassEditorComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassEditorRoutingModule {}
