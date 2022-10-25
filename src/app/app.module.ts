import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule}from "@angular/forms";
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorSetupComponent } from './doctor-setup/doctor-setup.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordVerifyComponent } from './forgotpassword-verify/forgotpassword-verify.component';
import { LoadupComponent } from './loadup/loadup.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboredComponent } from './doctor-dashbored/doctor-dashbored.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultationComponent } from './consultation/consultation.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DocdashComponent } from './docdash/docdash.component';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ConsultaionoverviewComponent } from './consultaionoverview/consultaionoverview.component';
import { FollowupsComponent } from './followups/followups.component';
import { ChartsComponent } from './charts/charts.component';
import { CompleteProfileFormComponent } from './complete-profile-form/complete-profile-form.component';
import { CountUpDirective } from './count-up.directive';
import { DocumentsComponent } from './documents/documents.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    DoctorSetupComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ForgotpasswordVerifyComponent,
    LoadupComponent,
    PatientDashboardComponent,
    DoctorDashboredComponent,
    AppointmentsComponent,
    PatientsComponent,
    PatientsignupComponent,
    ConsultationComponent,
    KanbanComponent,
    TasksComponent,
    TaskKanbanComponent,
    NavigationComponent,
    DocdashComponent,
    CompleteProfileComponent,
    ConsultaionoverviewComponent,
    FollowupsComponent,
    ChartsComponent,
    CompleteProfileFormComponent,
    CountUpDirective,
    DocumentsComponent,
    StatsComponent,
    SettingsComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule ,
    MatCheckboxModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    LayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSnackBarModule,
    NgChartsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSliderModule

   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
