import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-followups',
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.scss']
})
export class FollowupsComponent implements OnInit {
 
  followuplist:any =[]
  public followupFormGroup :any;
  //navigation variables 
  show_followup = true
  show_make_task = false
   //search funtion variables 
   patients_array:any =[]
   selected_patient:any =""  
   //followup variable 
   followup:any;
   followup_seleted = false;
     //time variables 
  durationInSeconds = 5;
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,private gen: GeneralServicesService,private _snackBar: MatSnackBar) { 
    
    this.followupFormGroup =this.fb.group({
      follow_up_instruction: ['', Validators.required],
      follow_up_message: ['', Validators.required],
      follow_up_date: ['', Validators.required],
  })
  }

  

  ngOnInit(): void {
 
    this.gen.Folowup_Retrieve()
      .subscribe(
        (data)=>{
          console.log("followup data-->",data["data"])
          this.followuplist = data["data"]
        }
      )
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
  
  Delete(data:any){
    let payload  = {
      "dsata":{
        "follow_up_number":data["follow_up_number"]
      }
    }
    this.gen.Followup_Delete(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])

        },(error)=>{
          this.openSnackBar(error["error"]["message"])
        }
      )
  }
  openSnackBar(message: string) {
    console.log("snackbar-->",message)
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  Select_patient(data:any){
    this.selected_patient = data
    
  }
  SaveFollowup(post:any){
    let followup_payload ={
      "follow_up_instruction":post.follow_up_instruction,
      "follow_up_message":post.follow_up_message,
      "follow_up_date":post.follow_up_date,
    }
    console.log(followup_payload)
    this.openSnackBar("Follow Up Made")  
    this.show_followup =false
  

  }
  Remove(){
    this.selected_patient = ""
  }
 
  More_Info(data:any){
    this.followup = data
    this.followup_seleted = true
  }
  Close_Info(){
    this.followup = ""
    this.followup_seleted =false
  }
  Show_Make_Followup(){
    this.show_make_task = true;

  }
  Close_Make_Followup(){
    this.show_make_task = false;
  }
}
