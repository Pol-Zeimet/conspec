import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberManagerComponent } from './memberManager.component';


const routes: Routes = [
    {path: '',  component: MemberManagerComponent,}
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberManagerRoutingModule {}