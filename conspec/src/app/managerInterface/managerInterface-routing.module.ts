import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerInterfaceComponent } from './managerInterface.component';


const routes: Routes = [
    {path: '', 
    component: ManagerInterfaceComponent,
    children: [
        { path: '',         redirectTo: 'class', pathMatch: 'full' },
        { path: 'class',    loadChildren: './classManager/classManager.module#ClassManagerModule'},
        { path: 'class/new', loadChildren: './builders/classBuilder/classBuilder.module#ClassBuilderModule'},
        { path: 'member', loadChildren: './builders/memberBuilder/memberBuilder.module#MemberBuilderModule'}
    ]
    }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerInterfaceRoutingModule {}