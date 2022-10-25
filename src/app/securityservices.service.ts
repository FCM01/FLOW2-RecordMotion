import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityservicesService {
  public url = "http://127.0.0.1:5000"

  constructor(public http: HttpClient) { }

  Auth_check(final_payload:any)
  {
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/protected",final_payload,requestOptions).pipe(map((data: any,error: any) => {
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
