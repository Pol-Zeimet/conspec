import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerInterfaceComponent } from './managerInterface.component';


const routes: Routes = [
    {path: '', 
    component: ManagerInterfaceComponent,
    children: [
        { path: '',         redirectTo: 'class', pathMatch: 'full' },
        { path: 'sessions', loadChildren: './sessionPlanner/sessionPlanner.module#SessionPlannerModule'},
        { path: 'class',    loadChildren: './classManager/classManager.module#ClassManagerModule'},
        { path: 'class/new', loadChildren: './classBuilder/classBuilder.module#ClassBuilderModule'},
        { path: 'members',  loadChildren: './memberManager/memberManager.module#MemberManagerModule' },
        { path: 'member/new', loadChildren: './memberBuilder/memberBuilder.module#MemberBuilderModule'}
    ]
    }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerInterfaceRoutingModule {}