// @ts-ignore
import { NgModule } from '@angular/core';

import {ConnectionComponent} from './components/connection/connection.component';
import {HomeComponent} from './components/home/home.component';
import {MonitoringComponent} from './components/monitoring/monitoring.component';
import {PanneComponent} from './components/panne/panne.component';
import {GestionObjectComponent} from './components/gestion.object/gestion.object.component';
import {ActivityAnalysisComponent} from './components/activity.analysis/activity.analysis.component';
import {LocationComponent} from './components/location/location.component';
import {MedicalControlComponent} from './components/medical.control/medical.control.component';
import {BillingComponent} from './components/billing/billing.component';
import {ResidentComponent} from './components/resident/resident.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from './guards/auth-guard.service';
import {NotificationComponent} from "./components/notification/notification.component";
import {DetailIotComponent} from "./components/monitoring/detail.iot/detail.iot.component";
import {CustomComponent} from "./components/subscription/custom.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {ConfortComponent} from "./components/subscription/confort/confort.component";
import {EssentialComponent} from "./components/subscription/essential/essential.component";
import {SerenityComponent} from "./components/subscription/serenity/serenity.component";
import {TotalconfortComponent} from "./components/subscription/totalconfort/totalconfort.component";


const routes: Routes = [
  {
    path: '',
    component: ConnectionComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'confort',
    component: ConfortComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'essential',
    component: EssentialComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'serenity',
    component: SerenityComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'total-confort',
    component: TotalconfortComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'monitoring',
    component: MonitoringComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'panne',
    component: PanneComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'gestionObject',
    component: GestionObjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'activityAnalysis',
    component: ActivityAnalysisComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'medicalControl',
    component: MedicalControlComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'resident',
    component: ResidentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'detailiot/:id/:state',
    component: DetailIotComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'custom',
    component: CustomComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'survey',
    component: SurveyComponent
  }

];

// @ts-ignore
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
