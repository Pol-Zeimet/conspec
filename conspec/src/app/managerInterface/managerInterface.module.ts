
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {ManagerInterfaceRoutingModule} from './managerInterface-routing.module';
import { MemberManagerModule } from "./memberManager/memberManager.module";
import { SessionPlannerModule } from './sessionPlanner/sessionPlanner.module';

import {ClassesService} from '../shared/services/classesService';


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ManagerInterfaceRoutingModule,
    MemberManagerModule,
    SessionPlannerModule,
  ],
  providers: [ClassesService],
})
export class ManagerInterfaceModule { }
