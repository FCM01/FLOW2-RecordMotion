import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  show_add_patinet = false
  show_patients  = true
  @Output() dataemit  = new EventEmitter<any>()
  patients:any=[]
  constructor(private gn:GeneralServicesService) { }

  ngOnInit(): void {

    this.gn.Retrieve_patients()
      .subscribe(
        (data)=>{
          this.patients = data["data"]
        }
      )
  }
  expand(data:any){
    this.dataemit.emit(data)
  }
  Show_Make_Patient(){
    this.show_add_patinet =true
    this.show_patients =false
  }
  
  Close_Make_Patient(){
    this.show_add_patinet =false
    this.show_patients =true
  }
}

