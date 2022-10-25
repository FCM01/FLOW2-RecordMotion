import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  //session
  user_profile_recieved: any;
  user: string = '';
  selected: Date | null | undefined;
  panelOpenState = false;
  home = true
  show_appointment = false
  show_task = false
  show_followup = false
  show_patients = false
  show_documents = false
  show_consultations  = false
  show_stats = false 
  show_settings  = false


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}
  ngOnInit(): void {
    //SECTION:stats
   //Sessions
   this.user_profile_recieved = localStorage.getItem('user_profile');
   let session_data = JSON.parse(this.user_profile_recieved);
   this.user = session_data['user'];
  }
  //navigaton functions 
  Show_Home(){
    this.home = true
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = false
    this.show_documents =false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false

  }
  Show_Patients(){
    this.home = false
    this.show_appointment = false
    this.show_patients =true
    this.show_task = false
    this.show_followup = false
    this.show_documents =false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false

  }
  Show_Appointments(){
    this.home = false
    this.show_appointment = true
    this.show_task = false
    this.show_followup = false
    this.show_patients =false
    this.show_documents =false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false
  }
  Show_Tasks(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = true
    this.show_followup = false
    this.show_documents =false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false
    
  }
  Show_Followup(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = true
    this.show_documents =false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false
  }
  Show_Documents(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = false
    this.show_documents =true
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =false
  }
  Show_Consultations(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = false
    this.show_documents = false
    this.show_consultations =true
    this.show_settings= false
    this.show_stats =false

  }
  Show_Stats(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = false
    this.show_documents = false
    this.show_consultations =false
    this.show_settings= false
    this.show_stats =true

  }
  Show_settings(){
    this.home = false
    this.show_appointment = false
    this.show_patients =false
    this.show_task = false
    this.show_followup = false
    this.show_documents = false
    this.show_consultations =false
    this.show_stats = false
    this.show_settings= true

  }
  Logout(){
    localStorage.removeItem('user_profile');
    this.router.navigate(["/"])
  }

}
