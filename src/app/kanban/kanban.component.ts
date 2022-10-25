import { Component, VERSION, OnInit,Output,EventEmitter, Inject } from '@angular/core';
import {GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';

import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { Router } from '@angular/router';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})

export class KanbanComponent implements OnInit {
  //reschedule variables 
  show_reschedule = false;
  show_reschedule_table = false;
  selected_appointment ={}
  selected_appointment_payload ={}
  selected_item_kanban:any =""
  return_appoitnmet:any;
  //dialog variables 
  animal: string="";
  name: string="";
  //stats variables 
  num_ptc:any
  //time variables 
  durationInSeconds = 5;
  public now: Date = new Date();
  time:any = this.now. toLocaleString('en-US', { hour: 'numeric', hour12: true })
  panelOpenState = false;
  //navigation variables 
  show_makeappointment= false
  show_home =true
  show_patient_profile_complete =false;
  message  = "";
  message_block = false; 
  appointmentlist:any |null  =[]
  tableappointmentlist:any =[]
  arrivedlist:any=[]
  reschedulelist:any=[]
  list_rescheduled:any =[]
  //history variables 
  dates = []
  show_dates= false;
  allow_delete=true; 
  @Output() appointmentemit  = new EventEmitter<any>()


  public board: Board = new Board('Test Board', [
    new Column('Appointments', '21',this.appointmentlist),
    new Column ("Arrived","12",this.arrivedlist),
    new Column('Reschedule',"18",this.reschedulelist)
  ]);

  Consult(data1:any){
    let payload ={
      "data":{
        "patient_number":data1["patient_number"]
      }
    }
    this.gen.Check_if_ProfiletoCreate(payload)
    .subscribe(
      (data)=>{
        if (data["message"]=="success"){
          console.log("in call",data1)
          this.appointmentemit.emit(data1)
        }
        else{
          this.openSnackBar(data["message"])
          this.Show_Profile_Compelete()

        }
        

      }
      ,(error) =>{
        this.openSnackBar(error["error"]["message"])
       
        
      }
    )
    
  }
  constructor(private gen:GeneralServicesService,private router:Router,private _snackBar: MatSnackBar) { 
    
  }

  ngOnInit(): void {
    this.Get_Patient_Profile_Stat()
    
    if (this.appointmentlist.length  == 0){
      this.gen.Kanban_Intiate()
      .subscribe(
        (data)=>{
          if (data["message"]=="success")
          {
            this.message  =  data["messsage"]
            this.message_block = true;
          }
          if (data["data"]["appointmentlist"].length == 0 && data["data"]["arrivedlist"].length == 0 && data["data"]["reschedulelist"].length == 0){
            this.Todays_Appointment()
          }
          else{
          let array = data["data"]["appointmentlist"]
          for(let i = 0 ; array.length;i++){
            this.appointmentlist.push({"name":array[i]["name"],"surname":array[i]["surname"],"time_slot":array[i]["time_slot"],"email":array[i]["email"],"phone_number":array[i]["phone_number"],"patient_number":array[i]["patient_number"]})
            this.tableappointmentlist.push({"name":array[i]["name"],"surname":array[i]["surname"],"time_slot":array[i]["time_slot"],"email":array[i]["email"],"phone_number":array[i]["phone_number"],"patient_number":array[i]["patient_number"]})
          }
          let array2 =data["data"]["arrivedlist"]
          for(let i = 0 ; array2.length;i++){
            this.arrivedlist.push({"name":array2[i]["name"],"surname":array2[i]["surname"],"time_slot":array2[i]["time_slot"],"email":array2[i]["email"],"phone_number":array2[i]["phone_number"],"patient_number":array2[i]["patient_number"]})
          }
          let array4  = data["data"]["reschedulelist"]
          for(let i = 0 ; array4.length;i++){
            this.reschedulelist.push({"name":array4[i]["name"],"surname":array4[i]["surname"],"time_slot":array4[i]["time_slot"],"email":array4[i]["email"],"phone_number":array4[i]["phone_number"],"patient_number":array4[i]["patient_number"]})
          }


          }
          

        }
      )
      
    }
    
   
   
    
  }

  public dropGrid(event: CdkDragDrop<string[]>): void {
    
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {

    if (event.previousContainer === event.container) {
     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        if (event.container.id == '18'){
            let data:any;
            for(let i =0;i<this.reschedulelist.length;i++){
              data =this.reschedulelist[i]
            }
            this.return_appoitnmet = data
            this.Set_rescedule_appointment(data)
          }
      let payload ={
        "data":{
          "appointmentlist":this.appointmentlist,
          "arrivedlist":this.arrivedlist,
          "reschedulelist":this.reschedulelist
        }
      } 
        this.gen.Update_Kanban(payload)
        .subscribe(
          (data)=>{
            this.openSnackBar(data["message"])   

          }
        )
     
    }
  }
 

  //appointment fetch
  Todays_Appointment(){
    this.gen. Retrieve_Today_Appointments()
    .subscribe(
      (data)=>{

        if (data["message"]=="No Appointments For Today"){
          this.message = data["message"]
          this.message_block = true
        }
        else{
         
          let array = data["data"][0]["bookings"]
          this.appointmentlist = array;
          this.tableappointmentlist  = array ;
          this.board = new Board('Test Board', [
            new Column('Appointments', '21',this.appointmentlist),
            new Column ("Arrived","12",this.arrivedlist),
            new Column('Reschedule',"18",this.reschedulelist)
          ]);
          
        }
        
      }
    )
  }
  All_Todays_Appointment(){
    this.time = ""
    this.allow_delete =true;
    this.show_dates = false;
    this.gen. All_Todays_Appointments()
    
    .subscribe(
      (data)=>{

        if (data["message"]=="No Appointments For Today"){
          this.message = data["message"]
          this.message_block = true
        }
        else{
         
          this.tableappointmentlist =[]
          let array = data["data"]
          this.tableappointmentlist = array
       
          
        }
        
      }
    )
  }
  Current_Todays_Appointment(){
    this.time = this.now. toLocaleString('en-US', { hour: 'numeric', hour12: true })
    this.allow_delete =true;
    this.show_dates = false
    this.gen. Retrieve_Today_Appointments()
    .subscribe(
      (data)=>{

        if (data["message"]=="No Appointments"){
          this.message = data["message"]
          this.message_block = true
        }
        else{
         
          this.tableappointmentlist =[]
          let array = data["data"][0]["bookings"]
          this.tableappointmentlist = array
          
          
        }
        
      }
    )
    }  
    Reload(){
      this.time = this.now. toLocaleString('en-US', { hour: 'numeric', hour12: true })
      this.allow_delete =true;
      this.show_dates = false
      this.gen. Retrieve_Today_Appointments()
      .subscribe(
        (data)=>{
  
          if (data["message"]=="No Appointments"){
            this.message = data["message"]
            this.message_block = true
          }
          else{
           
            this.tableappointmentlist =[]
            let array = data["data"][0]["bookings"]
            for(let i = 0 ; array.length;i++){
            this.appointmentlist.push({"name":array[i]["name"],"surname":array[i]["surname"],"time_slot":array[i]["time_slot"],"email":array[i]["email"],"phone_number":array[i]["phone_number"],"patient_number":array[i]["patient_number"]})
           
          }
            this.board = new Board('Test Board', [
              new Column('Appointments', '21',this.appointmentlist),
              new Column ("Arrived","12",this.arrivedlist),
              new Column('Reschedule',"18",this.reschedulelist)
            ]);
          
          
          }
          
        }
      )
      }  
  toggleSelection(number_of_item:any){
    
    const index = this.appointmentlist.indexOf(number_of_item, 0);
    if (index > -1) {
    this.appointmentlist.splice(index, 1);
    }

    const index2 = this.arrivedlist.indexOf(number_of_item, 0);
    if (index > -1) {
    this.arrivedlist.splice(index2, 1);
    }

     const index3 = this.reschedulelist.indexOf(number_of_item, 0);
     if (index > -1) {
     this.reschedulelist.splice(index3, 1);
    }
    let payload ={
      "data":{
        "appointmentlist":this.appointmentlist,
        "arrivedlist":this.arrivedlist,
        "reschedulelist":this.reschedulelist
      }
    }
    this.gen.Update_Kanban(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])   

        }
      )

  }
 
  Reschedule_appointment(date:any){
    let payload  = {
      "data":{
        "patient_number":this.selected_appointment,
        "date":date
      }
    }
 
    this.gen.Reschedeule(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          this.show_reschedule =false
          this.show_reschedule_table =false
          this.return_appoitnmet = {}
          this.toggleSelection(this.selected_appointment_payload)

        }
        ,(error) =>{
  
          this.openSnackBar(error["error"]["message"])
        }
      )
  } 
  Close_Reschedule(){
    this.selected_appointment = {}
    this.show_reschedule = false
    this. show_reschedule_table = false
    

  }
  Set_rescedule_appointment(data:any){
    this.selected_appointment_payload =data
    this.selected_appointment = data["patient_number"]
    this.show_reschedule= true
  }
  Set_rescedule_appointment_table(data:any){
    this.selected_appointment_payload =data
    this.selected_appointment = data["patient_number"]
    this.show_reschedule_table= true
  }
  Close_Reschedule_table(){
    this.selected_appointment = {}
    this.show_reschedule_table = false

  }
  Get_dates(){
    this.allow_delete =false;
    this.gen.Get_history_dates()
      .subscribe(
        (data)=>{
          this.dates = data["data"]
          this.show_dates = true
        }
      )
  }
  Select_dates(data:any){
    if(data!= ""){
      this.time = data
      let payload = {
        "data":{
          "date":data
        }
        
      }
      this.gen.History_Apppointments_retrieve(payload)
    .subscribe(
      (data)=>{

        if (data["message"]=="No Appointments"){
          this.message = data["message"]
          this.message_block = true
        }
        else{
          this.show_dates = false;
         
          this.tableappointmentlist =[]
          let array = data["data"][0]["bookings"]
          this.tableappointmentlist = array
         
          
          
        }
        
      }
    )

    }
  }
  Delete_Appointment(data:any){
    let payload = {
      "data":{
        "appointment":data
      }
    }
    this.toggleSelection(data)
    this.gen.Delete_Appointment(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          location.reload()

        }
        ,(error) =>{
     
          this.openSnackBar(error["error"]["message"])
        }
      )
  }
  Close_dates(){
    this.show_dates = false;
  }
  Table_Select(data:any){
    console.log(data)

  }
  //navigation functions 
Show_Make_Appointment(){
  this.show_makeappointment= true
  this.show_patient_profile_complete= false
  this.show_home =false

}
Show_Profile_Compelete(){
  this.show_patient_profile_complete= true
  this.show_makeappointment= false
  this.show_home =false

}
Close_Make_Appointment(){
  this.show_home =true
  this.show_makeappointment= false

}
Close_Profile_Compelete(){
  this.show_home =true
  this.show_patient_profile_complete= false

}

  
openSnackBar(message: string) {
  console.log("snackbar-->",message)
  let action = "Close"
  this._snackBar.open(message,action,{
    duration: this.durationInSeconds * 1000,
  });
}
//SECTION:Stats function
Get_Patient_Profile_Stat(){
  this.gen.Retrieve_Stat_To_Complete_Profiles()
    .subscribe(
      (data)=>{
        this.num_ptc = data["data"]
      }
    )
}

}


