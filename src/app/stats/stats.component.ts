import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  appointment_stats: any = 0;
  followups_stats: any = 0;
  consultations_stats:any = 0;
  numbert_of_patient :any = 0
  doctors_note:any =0;
  perscription:any =0;
  tasks_stats: any = 0;
  duration = 1500;


  data = [];
  labels = [];

  history_data = [];
  history_labels = [];

  public barChartLegend = true;
  public barChartPlugins = []
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{ data: this.data, label: 'Todays Appointment Frequency' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartLegend2 = true;
  public barChartPlugins2 = []
  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    labels: this.history_labels,
    datasets: [{ data: this.history_data, label: 'Appointment History Growth' }],
  };

  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor(private gen: GeneralServicesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.gen.Retrieve_Stat_Bargrapgh().subscribe((data) => {
      this.data = data['data'];
      this.labels = data['labels'];
      this.barChartData = {
        labels: this.labels,
        datasets: [{ data: this.data, label: 'Todays Appointment Frequency' }],
      };
    });
    this.gen.Retrieve_Stats_Bargraph_Appointment_history().subscribe((data) => {
      this.history_data = data['data'];
      this.history_labels = data['labels'];
      this.barChartData2 = {
        labels: this.history_labels,
        datasets: [{ data: this.history_data, label: 'Appointment History Growth' }],
      };
    });
    this.gen.Retrieve_Stat_Followups().subscribe((data) => {
      this.followups_stats = data['data'];
    });
    this.gen.Retrieve_Stat_All_Consulation().subscribe((data) => {
      this.consultations_stats = data['data'];
    });
    this.gen.Retrieve_Stat_Number_Of_Patients().subscribe((data)=>{
      this.numbert_of_patient = data["data"]
    })
    this.gen.Retrieve_Stats_files().subscribe((data)=>{
      this.doctors_note = data["data"]["doctors_note_number"]
      this.perscription = data["data"]["perscriptions_number"]
    })
    this.gen.Retrieve_Stat_Today_Appointments().subscribe((data) => {
      
      this.appointment_stats = data['data'];
    }
    ,(error) =>{
     
      this.appointment_stats = error["error"]["message"]});
    this.gen.Retrieve_Stat_Active_Tasks().subscribe((data) => {
      this.tasks_stats = data['data'];
    });
  }

}
