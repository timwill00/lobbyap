import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  user :any;
  errorMessage:string="";

  constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) { }

    // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  login(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
    console.log(this.loginForm.value);
    this.data.getLogin(this.loginForm.value).subscribe(
      data1 => {this.user = data1;console.log("post is here: "+data1);
      if(this.user.length!=0){
        localStorage.setItem('Auth', '1');
        localStorage.setItem('reload', '1');
        
      this.router.navigate(['']);
      }else{
        this.errorMessage="Email or password is not correct. ";
      }
    }
    );
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  });
  }


}
