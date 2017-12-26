import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ManagerInterfaceModule} from './managerInterface/managerInterface.module'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ManagerInterfaceModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
