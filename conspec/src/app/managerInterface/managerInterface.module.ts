
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { NavbarComponent } from './components/navbar/navbar.component'


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    AngularFontAwesomeModule,
  ],
  providers: [],
})
export class ManagerInterfaceModule { }
