import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassBuilderComponent } from './classBuilder.component';


const routes: Routes = [
    {path: '',  component: ClassBuilderComponent,}
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassBuilderRoutingModule {}