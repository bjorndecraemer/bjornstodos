import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {Todo} from "../model/todo";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {
  AllTodosRequestNeedCheck,
  ResetInfoMessageState,
  TodoDeleteRequested,
  TodoUpdateStatusRequested
} from "../todo.actions";
import {
  isLoading,
  MessageType,
  selectAllCompletedTodos,
  selectAllOpenTodos,
  selectAllTodos,
  todoInfoMessage
} from "../todo.selectors";
import {ActivateTodoControls, OpenModifyTodoModal} from "../../common/state/layout/layout.actions";
import {debounceTime, filter, map, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos$ : Observable<Todo[]>;
  openTodos$ : Observable<Todo[]>;
  completedTodos$ : Observable<Todo[]>;
  loadingIsVisible$ : Observable<Boolean>;
  todoInfoMessageSubscription : Subscription;
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ResetInfoMessageState());
    this.store.dispatch(new ActivateTodoControls());
    this.store.dispatch(new AllTodosRequestNeedCheck());

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
    this.todoInfoMessageSubscription = this.store
      .pipe(
        select(todoInfoMessage),
        map((newMessage : MessageType) => newMessage.message ),
        withLatestFrom(),
        filter((newMessage : string) => newMessage && newMessage.length > 0)
      ).subscribe((newMessage : string) => {
        this.showMessage(newMessage);
      });

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
  public showMessage(newMessage : string) {
    this._success.next(newMessage);
  }

  ngOnDestroy(): void {
    this.todoInfoMessageSubscription.unsubscribe();
  }

}
