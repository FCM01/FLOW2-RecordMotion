import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComservicesService {
  private socket = io.io("http://localhost:3000");

  ConsultaionStart(data:any){
    this.socket.emit("group chat created",data)
  }

  constructor() { }
}
