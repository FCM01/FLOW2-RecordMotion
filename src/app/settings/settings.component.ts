import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { SecurityservicesService } from '../securityservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  public EditForm: FormGroup;
  user_profile_recieved:any;
  settings:any;
  emergency_info :any
  user_profile:any;
  durationInSeconds = 5;

  constructor(private gen:GeneralServicesService,private sec:SecurityservicesService,private router:Router,private fb: FormBuilder,private _snackBar: MatSnackBar) {
    this. EditForm = fb.group({
      "name" :[''],
      "surname":[''],
      "email":[''],
      "phone_number":[''],
   
    })
   }
   
  ngOnInit(): void {
    this.retrieveprofile()
  }
  openSnackBar(message: string) {
    console.log("snackbar-->",message)
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  Submit(post:any){
    if (post.name == ""){
      post.name = this.user_profile["name"]
    }
    if (post.surname == ""){
      post.surname = this.user_profile["surname"]
    }
    if (post.email == ""){
      post.email = this.user_profile["email"]
    }
    if (post.phone_number == ""){
      post.phone_number = this.user_profile["phone_number"]
    }
    
  
    let payload = {
      "data":{
      "patient_number":this.user_profile["user_number"],
      "name":post.name,
      "surname":post.surname,
      "email":post.email,
      "phone_number":post.phone_number,
    
    }
    }
    console.log(payload)
    // this.gen.Edit_PatientProfile(payload)
    //   .subscribe(
    //     (data)=>{
    //       this.openSnackBar(data["message"])
          
    //     }
    //   )
  
  }
  Logout(){
    localStorage.removeItem('user_profile');
    this.router.navigate(["/"])
  }
  retrieveprofile(){
    this.user_profile_recieved = (localStorage.getItem('user_profile'));
    let session_data= JSON.parse(this.user_profile_recieved);
   // SECTION:auth check area
   let payload ={
    "data":{
      "token":session_data["token"]
    }
  }
  this.gen.Retrieve_User_profile(payload)
    .subscribe(
      (data)=>{
        console.log(data)
          this.user_profile = data["user_account"]
          this.settings = data["settings"]
          this.emergency_info = data["emergency"]
      },
      (error) =>{
        this.openSnackBar(error["error"]["message"])
        
      }
    )
}
formatLabel(value: number) {
  if (value >= 1000) {
    return Math.round(value / 1000) + 'k';
  }

  return value;
}
}
