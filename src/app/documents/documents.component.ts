import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface Section {
  patient_number:string;
  filename: string;
  url: Date;
}
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  
  //notifications
  durationInSeconds = 5;

  notes: Section[] = [];
  persriptions: Section[] = []
  constructor(private gen:GeneralServicesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.Retrieve_file()
    
  }
Retrieve_file(){
  this.gen.Retrieve_files()
  .subscribe(
    (data)=>{
      this.notes =data["data"]["doctors_note"]
      this.persriptions = data["data"]["perscriptions"]

    },
    (error)=>{
      this.openSnackBar(error["error"]["message"])
    }
  )
}
  
openSnackBar(message: string) {
  let action = "Close"
  this._snackBar.open(message,action,{
    duration: this.durationInSeconds * 1000,
  });
}
}
