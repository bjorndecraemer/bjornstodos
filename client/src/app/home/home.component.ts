import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppState} from "../app.state";
import {DeActivateTodoControls} from "../common/layout/layout.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, private store : Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new DeActivateTodoControls());
  }

  todoListClicked(){
    this.router.navigate(['/todos']);
  }
}
