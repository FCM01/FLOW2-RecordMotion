import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { GeneralServicesService } from '../general-services.service';


@Component({
  selector: 'app-doctor-setup',
  templateUrl: './doctor-setup.component.html',
  styleUrls: ['./doctor-setup.component.scss']
})
export class DoctorSetupComponent implements OnInit {
  ngOnInit(): void {
  }

  public Set1Form: FormGroup;
  public Set2Form: FormGroup;
  public Set3Form: FormGroup;

  //sevices array
  services:any =[];
  service_error =""

  step1 = true;
  step2 = false;
  step3 = false;
  //payloads
  step1_payload  = {};
  step2_payload = {}; 

  //loading screen varible 
  wait  = false


  public error_message ='';
  public titleAlert1 :string ="This field is required"
  constructor(private fb: FormBuilder,private router: Router, private gn :GeneralServicesService) { 
    this.Set1Form = fb.group({
      "first_name":['',Validators.required],
      "surname":['',Validators.required],
      "dob":['',Validators.required],
      "gender":['',Validators.required],
      "specialization":['',Validators.required],
      "phone_number":['',Validators.required],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "password_confirm": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "email":["",Validators.compose([Validators.email,Validators.required])],
      "validate": ''
    });
    this.Set2Form = fb.group({
      "practise_number":['',Validators.required],
      "practise_name":['',Validators.required],
      "practice_slogan":['',Validators.required],
      "open":['',Validators.required],
      "closed":['',Validators.required],
      "practise_phone_number":['',Validators.required],
      "parctise_address":[''],
      "number_of_employees":[''],
      "practise_vision":[''],
      


      
    })
    this.Set3Form = fb.group({
      "patient_threshhold":['',Validators.required],
      "payment_method":['',Validators.required],

    })
  }

 
  password_check(password_1:any,password_2:any){
    let final_password;
    if (password_2 == password_1){
      final_password = password_2
      return {"responce":1,"password":final_password}
    }
    else{
      return {"responce":0}
    }
  }
  Save_Form1(post:any){
    let  password_check = this.password_check(post.password_confirm,post.password)
    let paylod  =  {
      "name":post.name,
      "surname":post.surname,
      "dob":post.day_of_birth,
      "password":password_check["password"],
      "gender":post.gender,
      "specialization":post.specialization,
      "email":post.email,
      "phone_number":post.phone_number,
      
    }
    this.Show_step2()
    this.step1_payload =paylod;
  }
  Save_Form2(post:any){
    let payload ={
      "practise_name":post.practise_name,
      "practice_slogan":post.slogan,
      "working_hours":{
        "open":post.open,
        "closed":post.closed
      },
      "practise_phone_number":post.phone_number,
      "parctise_address":post.address,
      "number_of_employees":post.number_of_employees,
      "practise_vision":post.vision,
      "sevices":this.services,
      "address":post.address
      
    }
    this.Show_step3()
    this.step2_payload = payload;
  }
  Save_Form3(post:any){
    this.wait = true;
    let payload = {
      "patient_threshhold":post.patient_threshhold,
      "payment_method":post.payment_method
    }
    
      let doctor_profile ={
        data:{
          "step1":this.step1_payload,
          "step2":this.step2_payload,
          "step3":payload
        }
      
      }
      this.gn.SignUp(doctor_profile) 
       .subscribe(  
        (data) =>{
          
          if(data["response"] == 1){
            this.wait = false
            this.router.navigate(["/doctordash"])
           
          }
          else{
            this.error_message = "Sign up failed"
          }
        }
       )
 

    
  
  }
  toggleSelection(number_of_item:any){
    
    const index = this.services.indexOf(number_of_item, 0);
    if (index > -1) {
    this.services.splice(index, 1);
}
  }

  addServices(service_name:string, price:any,description:string){
    if (service_name != "" && price != 0 && description != ""){
      let payload={
        "service_name":service_name,
        "price":price,
        "description":description
      }
      this.services.push(payload);

    }
    else{
      this.service_error = "Please provide full information"
    }

  }
 
  Show_step1(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }

  Show_step2(){
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
  }

  Show_step3(){
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
  }
}



