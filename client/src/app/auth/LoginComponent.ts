import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector : "login",
  templateUrl : './login.component.html'
})

export class LoginComponent implements OnInit{



  userForm : FormGroup;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
    this.initForm();
  }
  login() {
    let userName : string = this.userForm.value.userName;
    let password : string = this.userForm.value.password;
      let url = 'http://localhost:8080/api/v1/todos/user';
    this.http.post<Observable<boolean>>(url, {
      userName: userName,
      password: password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(userName + ':' + password)
        );
        this.router.navigate(['']);
      } else {
        alert("Authentication failed.")
      }
    });
  }
  private initForm() {
    let todoTitle = '';
    let todoDescription = '';
    this.userForm = new FormGroup({
      'userName': new FormControl(todoTitle, [Validators.required, Validators.maxLength(40)]),
      'password': new FormControl(todoDescription, [Validators.required]),
    });
  }

}
