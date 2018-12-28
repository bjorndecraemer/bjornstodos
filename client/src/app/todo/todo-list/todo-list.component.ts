import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../model/todo";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {AllTodosRequested, TodoDeleteRequested} from "../todo.actions";
import {selectAllCompletedTodos, selectAllOpenTodos, selectAllTodos} from "../todo.selectors";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$ : Observable<Todo[]>;
  openTodos$ : Observable<Todo[]>;
  completedTodos$ : Observable<Todo[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
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
  }

  deleteTodoPressed(id : number){
    this.store.dispatch(new TodoDeleteRequested({id:id}));
  }

}
