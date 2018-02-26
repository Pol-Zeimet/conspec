import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberOverviewComponent } from './memberOverview.component';


const routes: Routes = [
    {path: '',  component: MemberOverviewComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberOverviewRoutingModule {}
