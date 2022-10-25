import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorSetupComponent } from './doctor-setup/doctor-setup.component';
import { LoadupComponent } from './loadup/loadup.component';
import { LoginComponent } from './login/login.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DoctorDashboredComponent } from './doctor-dashbored/doctor-dashbored.component';
import { ForgotpasswordVerifyComponent } from './forgotpassword-verify/forgotpassword-verify.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ChartsComponent } from './charts/charts.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:"",component:LoadupComponent},
  {path:"login",component:LoginComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"verify",component:ForgotpasswordVerifyComponent},
  {path:"patientdash",component:PatientDashboardComponent },
  {path:"doctorsetup",component:DoctorSetupComponent},
  {path:"doctordash",component:DoctorDashboredComponent},
  {path:"appointments",component:AppointmentsComponent},
  {path:"patients",component:PatientsComponent},
  {path:"patiestssignup",component:PatientsignupComponent},
  {path:"consult",component:ConsultationComponent},
  {path:"chart",component:ChartsComponent},
  {path:"completeprofile",component: CompleteProfileComponent},
  {path:"settings",component: SettingsComponent},




  
  
  {path:"**",component:LoadupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
