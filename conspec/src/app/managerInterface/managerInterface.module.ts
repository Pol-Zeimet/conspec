
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {ManagerInterfaceRoutingModule} from './managerInterface-routing.module';
import { MemberManagerModule } from "./memberManager/memberManager.module";


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    ManagerInterfaceRoutingModule,
    MemberManagerModule,
  ],
  providers: [],
})
export class ManagerInterfaceModule { }
