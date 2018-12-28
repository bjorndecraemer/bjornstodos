import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";
import {TodoCreateRequested} from "../todo/todo.actions";
import {TodoHelperService} from "../services/todo-helper.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  newTodoForm : FormGroup;

  constructor(private store : Store<AppState>, private todoHelperService : TodoHelperService) { }

  ngOnInit() {
    this.initForm();
  }

  public onCreateNewTodo(){
    console.log("Create new pressed!",this.newTodoForm.value);
    let title : string = this.newTodoForm.value.todoTitle;
    let description : string = this.newTodoForm.value.todoDescription;
    this.store.dispatch(new TodoCreateRequested({todo : this.todoHelperService.generateTodoFromTitleAndDescription(title,description)}));
  }

  private initForm() {
    let todoTitle = '';
    let todoDescription = '';


    this.newTodoForm = new FormGroup({
      'todoTitle': new FormControl(todoTitle, Validators.required),
      'todoDescription': new FormControl(todoDescription, Validators.required),
    });
  }
}
