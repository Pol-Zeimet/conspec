
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ManagerInterfaceComponent } from './managerInterface.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'


@NgModule({
  declarations: [
    ManagerInterfaceComponent,
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    AngularFontAwesomeModule,
  ],
  providers: [],
})
export class ManagerInterfaceModule { }
