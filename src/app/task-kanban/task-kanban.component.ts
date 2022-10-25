import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-task-kanban',
  templateUrl: './task-kanban.component.html',
  styleUrls: ['./task-kanban.component.scss']
})
export class TaskKanbanComponent implements OnInit {
  //navigation variables 
  show_select =true
 //session
 user_profile_recieved:any 
  tabletasklist:any  =[]
  tasklist:any =[]
  inprogresslist:any=[]
  completelist:any=[]

  message  = "";
  message_block = false; 
  durationInSeconds = 5;
 
  




  constructor(private gen:GeneralServicesService,private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.Retrive_assigned_task()
   
}
  
  



  //appointment fetch
  All_tasks(){
    this.gen.Retrieve_Task()
    .subscribe(
      (data)=>{
        if (data["message"]=="no appointments for today"){
          this.tasklist.push(data["message"])

        }
        else{

          let array = data["data"]
          this.tabletasklist = array
          this.show_select =true
         
    
        }
        
      }
    )}
Retrive_assigned_task(){
  this.user_profile_recieved = (localStorage.getItem('user_profile'));
  let session_data= JSON.parse(this.user_profile_recieved);
  let payload  ={
    "data":{
      "token":session_data["token"]
    }
  }
  console.log("assigned payload-->",payload)
  this.gen.Retrieve_Assigned_Tasks(payload)
    .subscribe(
      (data)=>{
        if (data["message"]=="no appointments for today"){
          this.tabletasklist.push(data["message"])

        }
        else{

          let array = data["data"]
          this.tabletasklist = array
          this.show_select =true
         
    
        }
        
      }
    )

}
toggleSelection(item:any){
    
  const index = this.tabletasklist.indexOf(item, 0);
  if (index > -1) {
  this.tabletasklist.splice(index, 1);
  }
}
  Delete(data:any){
    let payload = {
      "data":{
        "task_id":data.task_id
      }
    }
    this.gen.Task_Delete(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
          location.reload()
          this.toggleSelection(data)
         
             
        }
      )
  }
  Complete(data:any){
    let payload = {
      "data":{
        "task_id":data.task_id
      }
    }
    console.log("[payload ]==>",payload )
    this.gen.Task_Complete(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])  
          this.toggleSelection(data)
          
        }
      )
  }
  Retrieve_Complete_Task(){
    this.gen.Retrieve_Task_Complete()
      .subscribe(
        (data)=>{
          this.show_select =false
          this.tabletasklist =data["data"]

        }
        ,(error) =>{
     
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

}
