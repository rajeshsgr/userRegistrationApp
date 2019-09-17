import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent  {

  @ViewChild('f', { static: false }) signupForm: NgForm;


  genders = ['Male', 'Female'];

  user = { name: '', age: '', gender: '', email: '',country: '' };

  users  = []; 

  submitted = false;

  countries = [
    { id: '1', name: 'Afghanistan', code: 'afg' },
    { id: '2', name: 'Algeria', code: 'alg' },
    { id: '3', name: 'Australia', code: 'aus' },
    { id: '4', name: 'Austria', code: 'austria' },
    { id: '5', name: 'Canada', code: 'can' },
    { id: '6', name: 'India', code: 'ind' },
    { id: '7', name: 'Italy', code: 'italy' },
    { id: '8', name: 'United Kingdom', code: 'uk' },
    { id: '9', name: 'United States', code: 'usa' }
  ]

  onSubmit() {

    console.log("Submit User List");

    this.user.name=this.signupForm.value.name;
    this.user.age=this.signupForm.value.age;
    this.user.gender=this.signupForm.value.gender;
    this.user.email=this.signupForm.value.email;
    this.user.country=this.signupForm.value.country;

    this.submitted=true;

    this.http
      .post(
        'http://localhost:8098/userSvc/api/users',
        this.user
      )
      .subscribe(responseData => {
        console.log(responseData);
      });

      this.getUserList();

  }

  getUserList(){

    console.log("Fetch User List");

    this.http.
    get('http://localhost:8098/userSvc/api/users')
    .subscribe((res : any[])=>{
      console.log(res);
      this.users = res;
      });
      console.log("Start Print");
      console.log(this.users);
      console.log("End Print");
    
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
