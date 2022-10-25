import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms"
import { SecurityservicesService } from '../securityservices.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientsignup',
  templateUrl: './patientsignup.component.html',
  styleUrls: ['./patientsignup.component.scss']
})
export class PatientsignupComponent implements OnInit {
  public agreement: string ="" ;
  public choices= [{"mes":"Agree","value":true},{"mes":"Disagree","value":false}]
  //navigations variables 
  show_personel = true;
  show_medical_info =false;
  show_waivers =false;
  durationInSeconds = 5;

  //form varibles 
  public Set1Form: FormGroup;
  public Set2Form: FormGroup;
  public Set3Form: FormGroup;

//dave payload variables
  step1_payload:any = {};
  step2_payload:any = {}; 
 //loading screen varible 
 wait  = false

  public error_message ='';
  public titleAlert1 :string ="This field is required"
 


  constructor(private router: Router,private fb: FormBuilder,private gen:GeneralServicesService,private _snackBar: MatSnackBar) { 
    this.Set1Form =fb.group({
      "name" :['',Validators.required],
      "surname":['',Validators.required],
      "email":['',Validators.email],
      "phone_number":['',Validators.required],
      "id_number":['',Validators.required],
      "title":['',Validators.required],
      "street_address":['',Validators.required],
      "city":['',Validators.required],
      "postal_code":['',Validators.required],
      "validate": ''
    })
    this.Set2Form =fb.group({
      "preexsiting_medical_issues":[''],
      "allgergies":[''],
      "medical_aid_providers":['',Validators.required],
      "medical_aid_number":['',Validators.required],
      "validate": ''
      
    })
    this.Set3Form =fb.group({
      "nearest_family_friend_name":['',Validators.required],
      "nearest_family_friend_surname":['',Validators.required],
      "nearest_family_friend_phonenumber":['',Validators.required],
      "nearest_family_friend_id_number":['',Validators.required],
      "agreement":['',Validators.required],
      "validate": ''
    } )

  }

  ngOnInit(): void {
  }
  

  //saving form data function

  Save_Form1(post:any){
  
    let payload  =  {
      "name":post.name,
      "surname":post.surname,
      "email":post.email,
      "id_number":post.id_number,
      "phone_number":post.phone_number,
      "title":post.title,
      "street_address":post.street_address,
      "city":post.city,
      "postal_code":post.postal_code
     
    }
    this.Show_step2()
    this.step1_payload =payload;
}
    
    

  Save_Form2(post:any){
    if (post.allgergies ==''){
      post.allgergies  = "None"
    }
    if (post.preexsiting_medical_issues ==''){
      post.preexsiting_medical_issues = "None"
    }
    let payload ={
      "preexsiting_medical_issues":post.preexsiting_medical_issues,
      "allgergies":post.allgergies,
      "medical_aid_providers":post.medical_aid_providers,
      "medical_aid_number":post.medical_aid_number,
      
    }
    console.log(payload)
    this.Show_step3()
    this.step2_payload = payload;
    this.step2_payload["preexsiting_medical_issue"]
  }
  Save_Form3(post:any){
    this.wait = true;

    if(post.agreement == true){
      let payload = {
        "data":{
        "name":this.step1_payload["name"],
        "surname":this.step1_payload["surname"],
        "gender":this.step1_payload["gender"],
        "email":this.step1_payload["email"],
        "id_number":this.step1_payload["id_number"],
        "phone_number":this.step1_payload["phone_number"],
        "date_of_birth":this.step1_payload["date_of_birth"],
        "title":this.step1_payload["title"],
        "street_address":this.step1_payload["street_address"],
        "city":this.step1_payload["city"],
        "postal_code":this.step1_payload["postal_code"],
        "preexsiting_medical_issues": this.step2_payload['preexsiting_medical_issues'],
        "allgergies":this.step2_payload["allgergies"],
        "medical_aid_providers":this.step2_payload["medical_aid_providers"],
        "medical_aid_number":this.step2_payload["medical_aid_number"],
      
        "nearest_family_friend_name":post.nearest_family_friend_name,
        "nearest_family_friend_surname":post.nearest_family_friend_surname,
        "nearest_family_friend_phonenumber":post.nearest_family_friend_phonenumber,
        "nearest_family_friend_id_number":post.nearest_family_friend_id_number,
        "agreement":post.agreement
        }
    
      }
      this.gen.Creation_patient_profile(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          this.router.navigate(["/doctordash"])
        }
      )

    }
    else{
      this.openSnackBar("You need to agree to waiver to recieve survice")
    }
   
    
  
  
    
  
  }
 


  //navigation functions

  Show_step1(){
    this.show_personel = true;
    this.show_medical_info = false;
    this.show_waivers = false;
  }

  Show_step2(){
    this.show_personel = false;
    this.show_medical_info  = true;
    this.show_waivers = false;
  }

  Show_step3(){
    this.show_personel = false;
    this.show_medical_info = false;
    this.show_waivers= true;
  }
  openSnackBar(message: string) {
    console.log("snackbar-->",message)
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  
    
  
}
