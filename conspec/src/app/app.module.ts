import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ManagerInterfaceModule} from './managerInterface/managerInterface.module';
import { AppRoutingModule } from './app-routing.module';
import {NgxElectronModule} from 'ngx-electron';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxElectronModule,
    ManagerInterfaceModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
