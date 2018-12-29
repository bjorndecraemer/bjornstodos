import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../model/todo";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {AllTodosRequested, TodoDeleteRequested} from "../todo.actions";
import {selectAllCompletedTodos, selectAllOpenTodos, selectAllTodos} from "../todo.selectors";
import {ActivateTodoControls, OpenModifyTodoModal} from "../../common/state/layout/layout.actions";

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
  }
  deleteTodoPressed(id : number){
    this.store.dispatch(new TodoDeleteRequested({id:id}));
  }
  completeTodoPressed(todo : Todo){
    console.log("completeTodoPressed called for todo : ",todo);
  }
  reopenTodoPressed(todo : Todo){
    console.log("reopenTodoPressed called for todo : ",todo);
  }
  modifyTodoPressed(todo : Todo){
    console.log("ModifyTodoPressed called for todo : ",todo);
    this.store.dispatch(new OpenModifyTodoModal({todo:todo}));
  }

}
