import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {SignupRequested} from "./state/auth.actions";
import {ApplicationUser} from "./model/application-user.model";

@Component({
  selector : "login",
  templateUrl : './login.component.html'
})

export class LoginComponent implements OnInit{
  userForm : FormGroup;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private http: HttpClient,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
    this.initForm();
  }
  login() {
    let userName : string = this.userForm.value.userName;
    let password : string = this.userForm.value.password;
    let appUser : ApplicationUser = {id : -1, username : userName, password : password};
    this.store.dispatch(new SignupRequested({user : appUser}));
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
