import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Todo} from "../model/todo";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {AllTodosRequested, TodoDeleteRequested, TodoUpdateStatusRequested} from "../todo.actions";
import {isLoading, selectAllCompletedTodos, selectAllOpenTodos, selectAllTodos} from "../todo.selectors";
import {ActivateTodoControls, OpenModifyTodoModal} from "../../common/state/layout/layout.actions";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$ : Observable<Todo[]>;
  openTodos$ : Observable<Todo[]>;
  completedTodos$ : Observable<Todo[]>;
  loadingIsVisible$ : Observable<Boolean>;
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ActivateTodoControls());
    this.store.dispatch(new AllTodosRequested());
    this.todos$ = this.store.pipe(select(selectAllTodos));
    this.openTodos$ = this.store
      .pipe(
        select(selectAllOpenTodos)
      )
    this.completedTodos$ = this.store
      .pipe(
        select(selectAllCompletedTodos)
      )
    this.loadingIsVisible$  = this.store
      .pipe(
        select(isLoading)
      )
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.showMessage();
  }
  deleteTodoPressed(id : number){
    this.store.dispatch(new TodoDeleteRequested({id:id}));
  }
  completeTodoPressed(todo : Todo){
    console.log("completeTodoPressed called for todo : ",todo);
    this.store.dispatch(new TodoUpdateStatusRequested({todo : todo, newStatus : true, completedDate : new Date()}));
  }
  reopenTodoPressed(todo : Todo){
    console.log("reopenTodoPressed called for todo : ",todo);
    this.store.dispatch(new TodoUpdateStatusRequested({todo : todo, newStatus : false, completedDate : null}));
  }
  modifyTodoPressed(todo : Todo){
    console.log("ModifyTodoPressed called for todo : ",todo);
    this.store.dispatch(new OpenModifyTodoModal({todo:todo}));
  }
  public showMessage() {
    this._success.next('This is a longer message!');
  }

}
