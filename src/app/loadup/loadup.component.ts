import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadup',
  templateUrl: './loadup.component.html',
  styleUrls: ['./loadup.component.scss']
})
export class LoadupComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["/login"])
    },1000)
    
  }
}
