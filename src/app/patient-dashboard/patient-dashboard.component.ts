import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { SecurityservicesService } from '../securityservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  //stats variables 
  consultation_number :any 
  followup_number:any
  duration = 1500;
//edit variables 
show_edit= false
public EditForm: FormGroup;
//delete variables 
show_delete_check  = false 
show_options = true
show_followup =false
show_consultations = true 
 //appointments
appointment_array = [];
//user customes
public name  = "";
public user_profile :any;

longText = `Provide more services for patient or Check patient reporst on the system `;
user_profile_recieved:any 

durationInSeconds = 5;
//patient data
patient_payload:any =""
patient_profile:any = {}
patient_num:any


constructor(private gen:GeneralServicesService,private sec:SecurityservicesService,private fb: FormBuilder,private _snackBar: MatSnackBar) {
  this. EditForm = fb.group({
    "name" :[''],
    "surname":[''],
    "email":[''],
    "phone_number":[''],
    "street_address":[''],
    "city":[''],
    "postal_code":[''],
    "medical_aid_providers":[''],
    "medical_aid_number":[''],
    "nearest_family_friend_name":[''],
    "nearest_family_friend_surname":[''],
    "nearest_family_friend_phonenumber":[''],
    "validate": ''
  })
 }

ngOnInit(): void {
  

}



 //edit function sessions 
//  public toggleSelection(item:any, _list:any) {
//   item.selected = !item.selected;
//   this.service_type = item;
//   this.selection =true

// }0
Get_Stats(data:any){
 
  
  this.gen.Retrieve_Stat_Patietnt_Consultations(data)
  .subscribe((data)=>{
    if (data["data"]=="undefined"){
      this.consultation_number ="No data"
    }
    this.consultation_number = data["data"]
  })
  this.gen.Retrieve_Stat_Patietnt_Followups(data)
    .subscribe(
      (data)=>{
        if (data["data"] =="undefined"){
          this.followup_number ="No data"
        }
        this.followup_number = data["data"]
      }
    )

 

}

retrievepatient($event:any){
  this.patient_payload = $event
  this.patient_num = this.patient_payload["patient_number"]
  console.log("[this.patient_num]-->",this.patient_num)
  let payload  = {
    "data":{
      "patient_number":this.patient_num
    }
  }
  this.Get_Stats(payload)
  this.gen.Retrieve_patient_profile(payload)
  .subscribe(
    (data)=>{
      this.patient_profile =data["data"]
      console.log(this.patient_profile)

    }
  )


}
DeleteCheck (){
  this.show_delete_check= true
  this.show_options =false;

}
Close_DeleteCHeck(){
  this.show_delete_check =false
  this.show_options =true;
}

Delete_patient(){

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
    let payload_patient = {
      "data":{
        "patient_number":this.patient_payload["patient_number"]
      }
    }
    this.gen.Patient_Delete(payload_patient)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          this.Close_DeleteCHeck()
        }
      )
  
    
   

  },(error)=>{
    this.openSnackBar(error["message"])

  })
  
  
}
openSnackBar(message: string) {
  console.log("snackbar-->",message)
  let action = "Close"
  this._snackBar.open(message,action,{
    duration: this.durationInSeconds * 1000,
  });
}
Show_Edit(){
  this.show_edit = true
  this.Close_consultation()
  this.Close_followup()
}
Close_Edit(){
  this.show_edit = false

}
//navigation fuction
Deselect(){
  this.patient_payload = "";
}

//edit fuction
Submit(post:any){
  if (post.name == ""){
    post.name = this.patient_profile["name"]
  }
  if (post.surname == ""){
    post.surname = this.patient_profile["surname"]
  }
  if (post.email == ""){
    post.email = this.patient_profile["email"]
  }
  if (post.phone_number == ""){
    post.phone_number = this.patient_profile["phone_number"]
  }
  if (post.date_of_birth == ""){
    post.date_of_birth = this.patient_profile["date_of_birth"]
  }
  if (post.medical_aid_providers == ""){
    post.medical_aid_providers= this.patient_profile["medical_aid_providers"]
  }
  if (post.medical_aid_number == ""){
    post.medical_aid_number = this.patient_profile["medical_aid_number"]
  }
  if (post.nearest_family_friend_name == ""){
    post.nearest_family_friend_name = this.patient_profile["nearest_family_friend_name"]
  }
  if (post.nearest_family_friend_surname == ""){
    post.nearest_family_friend_surname = this.patient_profile["nearest_family_friend_surname"]
  }
  if (post.nearest_family_friend_phonenumber == ""){
    post.nearest_family_friend_phonenumber = this.patient_profile["nearest_family_friend_phonenumber"]
  }
  if (post.street_address == ""){
    post.street_address = this.patient_profile["street_address"]
  }
  if (post.city == ""){
    post.city= this.patient_profile["city"]
  }
  if (post.postal_code == ""){
    post.postal_code= this.patient_profile["postal_code"]
  }

  let payload = {
    "data":{
    "patient_number":this.patient_payload["patient_number"],
    "name":post.name,
    "surname":post.surname,
    "email":post.email,
    "phone_number":post.phone_number,
    "street_address":post.street_address,
    "city":post.city,
    "postal_code":post.postal_code,
    "medical_aid_providers":post.medical_aid_providers,
    "medical_aid_number":post.medical_aid_number,
    "nearest_family_friend_name":post.nearest_family_friend_name,
    "nearest_family_friend_surname":post.nearest_family_friend_surname,
    "nearest_family_friend_phonenumber":post.nearest_family_friend_phonenumber
  }
  }
  console.log(payload)
  this.gen.Edit_PatientProfile(payload)
    .subscribe(
      (data)=>{
        this.openSnackBar(data["message"])
        this.Close_Edit()
      }
    )

}
Show_followups(){
this.show_followup  = true
this.show_consultations= false
}
Show_consultation(){
  this.show_consultations= true
  this.show_followup  = false
}
Close_followup(){
  this.show_followup  = false
}
Close_consultation(){
  this.show_followup  = false
  this.show_consultations= false
}
}
