import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberBuilderComponent } from './memberBuilder.component';


const routes: Routes = [
    {path: '',  component: MemberBuilderComponent,}
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberBuilderRoutingModule {}