import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ManagerInterfaceModule} from './managerInterface/managerInterface.module'
import { AppRoutingModule } from './app-routing.module';
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxElectronModule,
    ManagerInterfaceModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
