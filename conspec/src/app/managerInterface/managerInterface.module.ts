
import { NgModule } from '@angular/core';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {ManagerInterfaceRoutingModule} from './managerInterface-routing.module';
import { MemberManagerModule } from "./memberManager/memberManager.module";
import { SessionPlannerModule } from './sessionPlanner/sessionPlanner.module';


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    ManagerInterfaceRoutingModule,
    MemberManagerModule,
    SessionPlannerModule,
  ],
  providers: [],
})
export class ManagerInterfaceModule { }
