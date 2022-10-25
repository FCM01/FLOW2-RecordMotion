import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  //form variables
  public loginForm: FormGroup;
  public response: any;
  public request: any;

  public error_message = '';
  public titleAlert1: string = 'This field is required';
  // sign up variables
  public show_signup = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gen: GeneralServicesService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ]),
      ],
      validate: '',
    });
  }

  //#####Login area
  //show message hub
  ShowSignup() {
    this.show_signup = true;
    this.error_message = '';
  }
  HideSignup() {
    this.show_signup = false;
    this.error_message = '';
  }

  Login(post: any) {
    let final_payload = {
      data: {
        email: post.email,
        password: post.password,
      },
    };
    this.request = this.gen.Login(final_payload)

      .subscribe((data) => {
       
        console.log("respone-->",data)
        if (data['status'] == 200) {
          
          
         let payload  = {
          user :data["message"]["user"],
          token :data["token"]
         }
    
         // SECTION: auth
          localStorage.setItem('user_profile', JSON.stringify(payload));
          this.router.navigate(['/doctordash']);
        } 
        
      }
      
      ,(error) =>{
     
        this.error_message = error["error"]["message"]
      });
  }

}
