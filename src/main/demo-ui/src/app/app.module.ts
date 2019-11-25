// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './components/person/person.component';

// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
import {HeadComponent} from './components/head/head.component';
import {HomeComponent} from './components/home/home.component';
import {ConnectionComponent} from './components/connection/connection.component';
// @ts-ignore
import {FormsModule} from '@angular/forms';
import {MonitoringComponent} from './components/monitoring/monitoring.component';
import {PanneComponent} from './components/panne/panne.component';
import {GestionObjectComponent} from './components/gestion.object/gestion.object.component';
import {ActivityAnalysisComponent} from './components/activity.analysis/activity.analysis.component';
import {LocationComponent} from './components/location/location.component';
import {MedicalControlComponent} from './components/medical.control/medical.control.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    PersonComponent,
    HomeComponent,
    ConnectionComponent,
    MonitoringComponent,
    PanneComponent,
    GestionObjectComponent,
    ActivityAnalysisComponent,
    LocationComponent,
    MedicalControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
