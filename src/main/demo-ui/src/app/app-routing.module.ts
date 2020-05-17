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
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './guards/auth-guard.service';
import {CustomComponent} from './components/subscription/custom.component';
import {ConfortComponent} from './components/subscription/confort/confort.component';
import {EssentialComponent} from './components/subscription/essential/essential.component';
import {SerenityComponent} from './components/subscription/serenity/serenity.component';
import {TotalconfortComponent} from './components/subscription/totalconfort/totalconfort.component';
import {NotificationComponent} from "./components/notification/notification.component";
import {DetailIotComponent} from "./components/monitoring/detail.iot/detail.iot.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {MedicalResidentsComponent} from "./components/medical.control/medical.residents/medical.residents.component";
import {DetailAlertComponent} from "./components/medical.control/detail.alert/detail.alert.component";
import {MedicalProfilComponent} from "./components/medical.control/medical.profil/medical.profil.component";
import {ProfilelistComponent} from "./components/profilelist/profilelist.component";
import {PositionComponent} from "./components/position/position.component";
import {MockBillingComponent} from "./components/mock.billing/mock.billing.component";



const routes: Routes = [
  {
    path: '',
    component: ConnectionComponent
  },
  {
    path: 'home/:login',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'confort/:login',
    component: ConfortComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'essential/:login' ,
    component: EssentialComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'serenity/:login',
    component: SerenityComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'total-confort/:login',
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
    path: 'billing/:login',
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
  },
  {
    path: 'medicalControl/residents',
    component: MedicalResidentsComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'detailalert/:id',
    component: DetailAlertComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'medicalprofil/:id',
    component: MedicalProfilComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profileList',
    component: ProfilelistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'position',
    component: PositionComponent
  },
  {
    path: 'mock/billing',
    component: MockBillingComponent
  }

];

// @ts-ignore
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
