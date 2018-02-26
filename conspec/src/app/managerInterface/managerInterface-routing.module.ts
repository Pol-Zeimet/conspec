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
        { path: 'members', loadChildren: './memberOverview/memberOverview.module#MemberOverviewModule'},
        { path: 'member/new', loadChildren: './builders/memberBuilder/memberBuilder.module#MemberBuilderModule'},
        { path: 'member/edit', loadChildren: './builders/memberEditor/memberEditor.module#MemberEditorModule'},
        { path: 'session/new', loadChildren: './builders/sessionBuilder/sessionBuilder.module#SessionBuilderModule'},
        { path: 'session/edit', loadChildren: './builders/sessionEditor/sessionEditor.module#SessionEditorModule'}
    ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerInterfaceRoutingModule {}
