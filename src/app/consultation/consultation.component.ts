import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { flatMap } from 'rxjs';



@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],

})


export class ConsultationComponent implements OnInit {


  //event variables 
  patient_payload:any
  patient=false
  first_payload ={}
  second_payload ={}
  third_payload ={}
  followup_payload:any = {}
  docteors_note_payload:any = {}

  //notifications
  durationInSeconds = 5;
  error_message  = ""

  
  public firstFormGroup :any;
  public secondFormGroup :any;
  public thirdFormGroup :any;
  public followupFormGroup :any;
  public docteors_noteFormGroup :any;
  instructions = new FormControl('');
  
  instructionList: string[] = ['Results', 'Consultaion', 'Referal', 'Next Dosage'];

  drug_line:any =[]
  //navigation variables 
  show_followup =false 
  show_docters_note = false
  followup_created = false
  doctores_note_created = false
  public titleAlert1: string = 'This field is required';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  constructor(private fb: FormBuilder,private router:Router, private gen:GeneralServicesService,private _snackBar: MatSnackBar) { 
    this.firstFormGroup = this.fb.group({
      heartRate: ['', Validators.required],
      bp: ['', Validators.required],
      bp_position: [''],
      temp: ['', Validators.required],
      rr: ['', Validators.required],

    });
    this.secondFormGroup = this.fb.group({
      symptoms: ['', Validators.required],
      patient_notes: [''],

    });
    this.thirdFormGroup = this.fb.group({
      diagnosis: ['', Validators.required],
      length_of_course: [''],
    })
    this.followupFormGroup =this.fb.group({
        follow_up_instruction: ['', Validators.required],
        follow_up_message: ['', Validators.required],
        follow_up_date: ['', Validators.required],
    })
    this.docteors_noteFormGroup =this.fb.group({
      doctor_note: ['', Validators.required],
      organisation_name: [''],
  })
  
  
  }

  ngOnInit(): void {
  
    
  }
  openSnackBar(message: string) {
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }

  SaveFollowup(post:any){
    this.followup_payload ={
      "follow_up_instruction":post.follow_up_instruction,
      "follow_up_message":post.follow_up_message,
      "follow_up_date":post.follow_up_date,
    }
    console.log(this.followup_payload)
    this.openSnackBar("Follow Up Made")  
    this.show_followup =false
    this.followup_created= true

  }
  SaveFirstForm(post:any){
    this.first_payload ={
      "heartRate":post.heartRate,
      "bp":post.bp,
      "bp_position": post.bp_position,
      "temp":post.temp,
      "rr":post.rr,

    }

  }
  SaveSecondForm(post:any){
    this.second_payload={
      "symptoms":post.symptoms,
      "patient_notes": post.patient_notes,
    }

  }
  SaveTirdForm(post:any){
    this.third_payload= {
      "diagnosis":post.diagnosis,
      "length_of_course":post.length_of_course,
      "drug_lines":this.drug_line

    }

  }
  Submit(){
    let payload  = {} 
    if (this.followup_created ==true){
      payload =  {
        "data":
        {
          "patient_number": this.patient_payload["patient_number"],
          "patient_vitals":this.first_payload,
          "patient_diagnoisis" : this.third_payload,
          "patiet_doctor_note" : this.second_payload,
          "follow_up_instruction"  : this.followup_payload["follow_up_instruction"],
          "follow_up_message"  : this.followup_payload["follow_up_message"],
          "follow_up_date" : this.followup_payload["follow_up_date"]
        }
        
    }
  
    console.log(payload)
    }else{
      payload =  {
        "data":
        {
         
          "patient_number": this.patient_payload["patient_number"],
          "patient_vitals":this.first_payload,
          "patient_diagnoisis" : this.third_payload,
          "patiet_doctor_note" : this.second_payload,
          "follow_up_instruction"  :"",
          "follow_up_message"  : "",
          "follow_up_date" :""
        }
    }
    console.log(payload)
  }
    this.gen.Creation_Consultation(payload)
    .subscribe(
      (data) => {
        
          this.openSnackBar(data["message"])   
          location.reload()   
      }
      ,(error) =>{
     
        this.error_message = error["error"]["message"]
        this.openSnackBar(error["error"]["message"])
      });
    
    
   

  }
  
  Adddrug(i:any,q:any,fou:any){
    let data = {
      "item_name":i,
      "quantity":q,
      "frequency_of_use":fou
    }
    this.drug_line.push(data)
  }
  Delete(number_of_item:any){
    const index = this.drug_line.indexOf(number_of_item, 0);
    if (index > -1) {
    this.drug_line.splice(index, 1);
    }

  }
  retrieveappointment($event:any){
    this.patient_payload = $event
    console.log("recieved",$event)
    this.patient =true;
    
  }
  Show_followup(){
    this.show_followup =true
  }
  Close_followup(){
    this.show_followup =false
    this.followup_payload ={}
    this.followup_created = false
  }

  Show_doctors_note(){
    this. show_docters_note=true
  }
  Close_doctors_note(){
    this. show_docters_note =false
    this.docteors_note_payload ={}
  }
  Create_Doctors_Note(post:any){

    let  payload ={
      "data":{
        "note":post.doctor_note,
        "organisation_name":post.organisation_name,
        "patient_number":this.patient_payload["patient_number"]
      }
    }
    this.gen.Make_Doctors_Note(payload)
      .subscribe(
        (data) =>  {
          this.openSnackBar(data["message"])
          this.Close_doctors_note()
          this.doctores_note_created = true

        },
        (error)=>{
          this.openSnackBar(error["error"]["message"])

        })

  }

  Cancel(){
    this.patient_payload ={}
    this.openSnackBar("Consultation canceled")  
    location.reload()
    

  }
  


}
