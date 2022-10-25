import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
   //time variables 
   durationInSeconds = 5;
  //auth variables
  user_id:any ="21313231"
  //navigation
  search = false 
  add_task  = false 
  show_assign  = false
 //search funtion variables 
 patients_array:any =[]
 user_array:any = []
 selected_patient:any =[] 
 assigned_user :any  =  []
 //general variables
  task_list :any =[{}]
  public choices = []
  public priorties= [{"mes":"High","color":"red"},{"mes":"Medium","color":"yellow"},{"mes":"Low","color":"green"}]
  public TaskForm: FormGroup;
  public error_message = '';
  public titleAlert1: string = 'This field is required';
  constructor( private router: Router,
    private fb: FormBuilder,
    private gen: GeneralServicesService,
    private _snackBar: MatSnackBar) { 
      this.TaskForm = fb.group({
        "task":["",Validators.required],
        "priorty":[""],
      })
    }

  ngOnInit(): void {
    this.Retrive_user()
  }

  toggleSelection(number_of_item:any){
    
    const index = this.task_list .indexOf(number_of_item, 0);
    if (index > -1) {
    this.task_list.splice(index, 1);
  }
  }
  openSnackBar(message: string) {
    console.log("snackbar-->",message)
    let action = "Close"
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  Submit(post:any){
    if (post.priorty!=""){
      if (post.date==""){

        function padTo2Digits(num: number) {
          return num.toString().padStart(2, '0');
        }
        
        function formatDate(date: Date) {
          return (
            [
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
            ].join('-') 
            
          );
        }
        post.date = formatDate(new Date())
      }
    let payload ={
      "data":{
      "user_id":this.user_id,
      "task":post.task,
      "priority":post.priorty,
      "assigned_user":this.assigned_user
      }
    }
      this.gen.Creation_task(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          location.reload()
        }
      )
    
  }else{
    this.openSnackBar("Please provide a priorty type for your task")

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

  Retrive_user(){
    this.gen.Retrieve_User_accounts()
    .subscribe(
      (data)=>{
        this.user_array  = data["staff_list"]

      }
    )
  }
  
  Select_patient(data:any){
    let payload  = {
      "user":"patient",
      "data" :data
      
    }
    this.assigned_user.push(payload)
    this.selected_patient.push(data)
    this.openSnackBar("Patient :"+ data["name"]+" selected")
   
  }
  Select_user(data:any){
    let payload  = {
      "user":"employee",
      "data" :data
      
    }
    this.assigned_user.push(payload)
    this.selected_patient.push(data)
    this.openSnackBar("User :"+ data["name"]+" selected")

    
  }
  Remove(data:any){
    const index = this.selected_patient.indexOf(data, 0);
    if (index > -1) {
    this.selected_patient.splice(index, 1);
    this.assigned_user.splice(index, 1);

    }
  }
  Show_add_task(){
    this.add_task =true

  }

  Close_add_task(){
    this.add_task =false;
    
  }

  Show_assign(){
    this.show_assign =true; 
  }
  Close_assign(){
    this.show_assign =false; 


  }
  

 
}
