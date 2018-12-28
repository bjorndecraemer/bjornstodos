import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {TodoService} from "../services/todo.service";
import {AppState} from "../app.state";
import {select, Store} from "@ngrx/store";
import {AllTodosLoaded, AllTodosRequested, TodoActionTypes, TodoCreatedDone, TodoCreateRequested} from "./todo.actions";
import {filter, map, mergeMap, switchMap, withLatestFrom} from "rxjs/operators";
import {allTodosLoaded} from "./todo.selectors";
import {GiphyService} from "../services/giphy.service";
import {Todo} from "./model/todo";

@Injectable()
export class TodoEffects{
  @Effect()
  loadAllCourses$ = this.action$
    .pipe(
      ofType<AllTodosRequested>(TodoActionTypes.AllTodosRequested),
      withLatestFrom(this.store.pipe(select(allTodosLoaded))),
      filter(([action, allTodosLoaded]) => !allTodosLoaded),
      mergeMap(() => this.todosService.getAllEnhancedTodos()),
      map(todos => new AllTodosLoaded({todos :todos}))
    );
  @Effect()
  createNewTodo$ = this.action$
    .pipe(
      ofType<TodoCreateRequested>(TodoActionTypes.TodoCreateRequested),
      switchMap(action => {
        console.log("Todo : ",action.payload.todo);
        return this.todosService.createNewTodo(action.payload.todo)}),
      map((todo: Todo) => new TodoCreatedDone({todo :todo}))
    );

 constructor(private action$ : Actions, private todosService : TodoService, private giphyService : GiphyService, private store : Store<AppState>){}

}
