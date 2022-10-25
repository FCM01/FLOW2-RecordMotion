import {  Component, OnInit,EventEmitter, Output} from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  @Output() dataemit  = new EventEmitter<any>()
  profiles:any=[]
  durationInSeconds = 5;
  constructor(private gn:GeneralServicesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.gn.  Retrieve_Patients_To_Complete()
      .subscribe(
        (data)=>{
          this.profiles = data["data"]
        }
      )
  }
  expand(data:any){
    this.dataemit.emit(data)
    

  }
  Delete(data:any){
    let  payload  = {
      "data":{
        "patient_number":data["patient_number"]
      }
    }
    this.gn.Delete_Patient_Complete_Profile(payload)
      .subscribe(
        (data)=>{
          this.openSnackBar(data["message"])
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
