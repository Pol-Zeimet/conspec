
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagerInterfaceRoutingModule} from './managerInterface-routing.module';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClassesService } from '../shared/services/classesService';
import { TransmitterService } from '../shared/services/transmitterService';
import { MemberService } from '../shared/services/memberService';
import { SessionService } from '../shared/services/sessionService';
import { LoggerService } from '../shared/services/loggerService';


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ManagerInterfaceRoutingModule,
  ],
  providers: [ClassesService, TransmitterService, MemberService, SessionService, LoggerService],
})
export class ManagerInterfaceModule { }
