import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassManagerComponent } from './classManager.component';


const routes: Routes = [
    {path: '',  component: ClassManagerComponent,}
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassManagerRoutingModule {}