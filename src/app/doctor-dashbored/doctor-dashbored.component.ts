import { Component, OnInit ,ViewChild} from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms"
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SecurityservicesService } from '../securityservices.service';

@Component({
  selector: 'app-doctor-dashbored',
  templateUrl: './doctor-dashbored.component.html',
  styleUrls: ['./doctor-dashbored.component.scss']
})
export class DoctorDashboredComponent implements OnInit {
//session
  user_profile_recieved:any 
//userr experience variables
user:string =""
profile:any  = ""
//appointment variables
patient_threshold:any;
appoiontment_show:any = true;



//navbar functions
public show_schedule = true;
  constructor(private router:Router,private fb: FormBuilder,private gen:GeneralServicesService,private sec:SecurityservicesService) { 
    
  }

  ngOnInit(): void {
    //Sessions
    this.user_profile_recieved = (localStorage.getItem('user_profile'));
    let session_data= JSON.parse(this.user_profile_recieved);
    this.user = session_data["user"]
    // SECTION:auth check area
    let payload ={
      "data":{
        "token":session_data["token"]
      }
    }
    this.sec.Auth_check(payload)
    .subscribe((data)=>{
      status = data["message"] 

    },(error)=>{
      this.router.navigate(['/']);

    })
    
  }
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
hideSchedule(){
  this.show_schedule = false
  if (this.show_schedule == false){
    this.show_schedule = true;
  }
}

//Navigation
Show_appointments(){
  this.appoiontment_show = true
}
Show_tasks(){
  this.appoiontment_show =false
}




}
