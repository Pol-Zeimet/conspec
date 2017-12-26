import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerInterfaceComponent } from './managerInterface.component';


const routes: Routes = [
    {path: '', 
    component: ManagerInterfaceComponent,
    children: [
        { path: '',         redirectTo: 'members', pathMatch: 'full' },
        { path: 'members',  loadChildren:  './memberManager/memberManager.module#MemberManagerModule' },
        { path: 'sessions', loadChildren: './sessionPlanner/sessionPlanner.module#SessionPlannerModule'}
    ]
    }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerInterfaceRoutingModule {}