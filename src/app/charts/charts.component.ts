import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServicesService } from '../general-services.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  fileToUpload: File |any;
  public uploadForm: FormGroup;
  constructor(private fb: FormBuilder,
    private gen: GeneralServicesService) { 
      this.uploadForm = fb.group({
        file: ['', Validators.required],
        
        validate: '',
      });
    }

  ngOnInit(): void {
  } 
  handleFileInput(event : any) {
    let data = event.target.files
    this.fileToUpload = data.item(0);
    console.log(this.fileToUpload)
    this.uploadFileToActivity()
}
uploadFileToActivity() {
  this.gen.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}

  

}
