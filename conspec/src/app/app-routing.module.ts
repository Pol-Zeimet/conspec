import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {ManagerInterfaceComponent} from './managerInterface/managerInterface.component'

const routes: Routes = [
    { path: '', component: ManagerInterfaceComponent },
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}