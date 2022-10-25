import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {
  public url = "http://127.0.0.1:5000"
  constructor(public http: HttpClient) { }

SignUp(final_payload:any)
  {
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/doctor/signup",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
Retrieve_profile(final_payload:any){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/doctor/signup",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
Retrieve_User_accounts(){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.get<any>(this.url+"/staff/retrieve",requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}

  Login(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/user/login",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  // SECTION:appointment routes 
  Retrieve_time_slots(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/Time/slot",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Make_Apointment(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/appointments",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Search_appointment(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/find",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  Retrieve_patients(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/retrieve/patientlist",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Patients_To_Complete(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/retrieve/patients/profiles/complete",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Tasks(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/retrieve/all/task",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Assigned_Tasks(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/retrieve/assigned/task",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_patient_profile(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/retrieve/patient/profile",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
    

  }
  Delete_Patient_Complete_Profile(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/complete/delete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
    

  }
  Delete_Appointment(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/appointment/delete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
    

  }
  Retrieve_Today_Appointments(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/today/appointment/retrieve",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Task(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/retrieve/all/task",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  // SECTION:patient routes 
  Creation_patient_profile(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/profile/creation",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Complete_patient_profile(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/profile/complete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Creation_task(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/Add/task",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Task_Delete(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/task/delete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Task_Complete(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/task/complete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
    
  }
  Retrieve_Task_Complete(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/retrieve/task/complete",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Update_Kanban(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/kanban/manage",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  }
    Reschedeule(final_payload:any){
      const requestOptions: Object = {
        //If your response is text not json
        responseType: 'json'
      }   
      return this.http.post<any>(this.url+"/reschedule/appointment",final_payload,requestOptions).pipe(map((data: any,error: any) => {
        if(data){
          return data;
        }
        else{
          return error;
        }
      })
      );

  }

  Update_Task_Kanban(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/task/kanban/manage",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Kanban_Intiate(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/kanban/initiate",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
 Task_Kanban_Intiate(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/task/kanban/initiate",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Folowup_Retrieve(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/followup/retrieve",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Followup_Delete(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.delete<any>(this.url+"/followup/delete",final_payload).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Patient_Delete(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/patient/delete",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Creation_Consultation(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/doctor/cousultation/create",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Get_services(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/service/retrieve",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  // SECTION:checks
  Check_if_ProfiletoCreate(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/check/to/create",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
 // SECTION:histroy
  History_Apppointments_retrieve(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/history/appointment/retrieve",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
  Get_history_dates(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/history/appointment/dates/retrieve",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  } 
  All_Todays_Appointments(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/alltoday/appointment/retrieve",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  } 
 // SECTION:stats
  Retrieve_Stat_To_Complete_Profiles(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/profiles/to/complete",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Number_Of_Patients(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/number/patients",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stats_files(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/files",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stats_Bargraph_Appointment_history(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/daily/bargraph/appointments",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Today_Appointments(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/all/appointments",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Bargrapgh(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/bargraph/appointments",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_All_Consulation(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/all/consultaions",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Active_Tasks(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/active/tasks",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Followups(){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/stats/all/followup",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }
  Retrieve_Stat_Patietnt_Followups(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/stats/patient/followups",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }

  Retrieve_Stat_Patietnt_Consultations(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/stats/patient/consultation",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  
  }
 
// SECTION:edit
Retrieve_User_profile(final_payload:any){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/retrieve/user",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
Edit_PatientProfile(final_payload:any){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/patient/edit",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
Edit_Services(final_payload:any){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/service/add",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}  
postFile(fileToUpload: File): Observable<boolean> {
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/service/add",fileToUpload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );
}
Make_Doctors_Note(final_payload:any){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/create/doctors/note",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
//SECTION:Files
Retrieve_files(){
  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.get<any>(this.url+"/retrieve/files",requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
}





