import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { SecurityservicesService } from '../securityservices.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
    //service selection
public service_array = []
public service_type :any; 
  public selection =false;
  durationInSeconds = 5;
  //session
  user_profile_recieved:any
  //navigation
  search = false
  value = 'Clear me';
  //time slot variables 
  threshold:any;
  slot_selected =  "";
  time_slot_list :any =[] 

  //general variables 
  public appointmentForm: FormGroup;
  public searchForm: FormGroup;

  public titleAlert1 :string ="This field is required";
  public error_message:any = "";
  public message:any;
  //search funtion variables 
  patients_array:any =[]
  selected_patient:any =""  
  constructor(private _snackBar: MatSnackBar,private router: Router,private fb: FormBuilder,private gen:GeneralServicesService,private sec:SecurityservicesService) { 
    this.appointmentForm = fb.group({
      "name":['',Validators.required],
      "surname":['',Validators.required],
      "email":['',Validators.required],
      "date":['',Validators.required],
      "phone_number":['',Validators.required],
      "validate": ''
    });
    this.searchForm = fb.group({
      "date":['',Validators.required],

    })

  }

  ngOnInit(): void {
    this.GetServices()
    this.gen.Retrieve_time_slots()
      .subscribe(
        (data)=>{
          this.time_slot_list = data["time_slots"]
        }
      )
     //Sessions
     this.user_profile_recieved = (localStorage.getItem('user_profile'));
     let session_data= JSON.parse(this.user_profile_recieved);
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
  Submit_serch(post:any){
    if (this.selected_patient != ""){
      if( this.slot_selected != ""){
        let payload  = {
          "data":{
            "service":this.service_type ,
            "name":this.selected_patient["name"],
            "surname":this.selected_patient["surname"],
            "email":this.selected_patient["email"],
            "date":post.date,
            "phone_number":this.selected_patient["phone_number"],
            "patient_number":this.selected_patient["patient_number"],
            "time_slot":this.slot_selected,
            
          }}
          this.gen.Make_Apointment(payload)
            .subscribe(
              (data)=>{
                if (data["message"] != "")
                {
                  
                  if (data["status"] == 400){
                    this.openSnackBar(data["message"])
                    this.selected_patient = ""
                    location.reload()
                    
                  }
                  else{
                    this.openSnackBar(data["message"])
                    location.reload()
                  }
                  
                  
                }
    
              }
            )
        
      }else{
        this.error_message  = "Please select a time slot"
      }

    }
    else{
      this.error_message = "No patient has been chosen"
    }
  }
  Submit(post:any){
    
    if( this.slot_selected != ""){
    let payload  = {
      "data":{
        "service":this.service_type,
        "name":post.name,
        "surname":post.surname,
        "email":post.email,
        "date":post.date,
        "phone_number":post.phone_number,
        "time_slot":this.slot_selected,
        "patient_number":""
        
      }}
      this.gen.Make_Apointment(payload)
        .subscribe(
          (data)=>{
            if (data["message"] != "")
            {
              this.openSnackBar(data["message"])
              this.selected_patient = ""
              location.reload()
            }

          }
        )
    
  }else{
    this.error_message  = "Please select a time slot"
  }
    
  }


Search(data:any){

  let payload = {
    "data":{
    "patient_deatail":data
  }}

  this.gen.Search_appointment(payload)
    .subscribe(
      (data)=>{
       this.patients_array  = data["data"]

      }
    )
}

Select_patient(data:any){
  this.selected_patient = data
  
}
Remove(){
  this.selected_patient = ""
}
setTime_slots(item:any){
     this.slot_selected = item 
  }

  //navigation function
  Show_search(){
    this.search =true; 
  }
  Close_search(){
    this.search =false; 
  }
  openSnackBar(message: string) {
    console.log("snackbar-->",message)
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  public ServiceSelection(item:any) {

    this.service_type = item;
    this.selection =true
    this.openSnackBar(item["service_name"]+" Selected");
  
  }
  public CancelSelection() {
    this.service_type = "";
    this.selection =false
  
  }
  public GetServices() {
   this.gen.Get_services()
    .subscribe(
      (data)=>{
        this.service_array = data["data"]
      }
    )
  
  }
  
}
