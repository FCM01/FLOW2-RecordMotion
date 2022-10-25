import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { GeneralServicesService } from '../general-services.service';

@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.scss'],
})
export class DocdashComponent {
  data = [];
  labels = [];
  appointment_stats: any = 0;
  followups_stats: any = 0;
  consultations_stats: any = 0;
  tasks_stats: any = 0;

  duration = 1500;
  //session
  user_profile_recieved: any;
  //userr experience variables
  user: string = '';
  longText =
    'ReordMotion is a new way to look at EHR systems that function as office automation systems or medical CAP that aim at assisting small to medium size clinics and private doctors to get more clients and have a more seamless and viable future-driven way to running their practices and for side work for doctors who would like to get their name out there without having to have a physical practice and minimizing the cost of starting off as a young practitioner in the industry.';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{ data: this.data, label: 'Todays Appointment Frequency' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor(
    private breakpointObserver: BreakpointObserver,
    private gen: GeneralServicesService
  ) {}
  ngOnInit(): void {
    //SECTION:stats
    this.gen.Retrieve_Stat_Bargrapgh().subscribe((data) => {
      this.data = data['data'];
      this.labels = data['labels'];
      this.barChartData = {
        labels: this.labels,
        datasets: [{ data: this.data, label: 'Todays Appointment Frequency' }],
      };
      console.log('[barChartData] ->', this.barChartData);
    });
    this.gen.Retrieve_Stat_Followups().subscribe((data) => {
      this.followups_stats = data['data'];
    });
    this.gen.Retrieve_Stat_All_Consulation().subscribe((data) => {
      this.consultations_stats = data['data'];
    });
    this.gen.Retrieve_Stat_Today_Appointments().subscribe((data) => {
      console.log("[appointment_stats]-->",data['data'])
      this.appointment_stats = data['data'];
    }
    ,(error) =>{
     
      this.appointment_stats = error["error"]["message"]});
    this.gen.Retrieve_Stat_Active_Tasks().subscribe((data) => {
      this.tasks_stats = data['data'];
    });
    //Sessions
    this.user_profile_recieved = localStorage.getItem('user_profile');
    let session_data = JSON.parse(this.user_profile_recieved);
    this.user = session_data['user'];
  }
}
