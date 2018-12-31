import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {TodoService} from "../services/todo.service";
import {AppState} from "../app.state";
import {select, Store} from "@ngrx/store";
import {
  AllTodosLoaded,
  AllTodosRequested,
  LoadingBusy,
  TodoActionTypes,
  TodoCreatedDone,
  TodoCreateRequested,
  TodoDeleteDone,
  TodoDeleteRequested,
  TodoUpdateDone,
  TodoUpdateStatusRequested,
  TodoUpdateTitleAndDescriptionRequested
} from "./todo.actions";
import {filter, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {allTodosLoaded} from "./todo.selectors";
import {GiphyService} from "../services/giphy.service";
import {Todo} from "./model/todo";
import {Update} from "@ngrx/entity";
import {ShowInfoMessage} from "../common/state/layout/layout.actions";

@Injectable()
export class TodoEffects{
  @Effect()
  loadAllCourses$ = this.action$
    .pipe(
      ofType<AllTodosRequested>(TodoActionTypes.AllTodosRequested),
      withLatestFrom(this.store.pipe(select(allTodosLoaded))),
      filter(([action, allTodosLoaded]) => !allTodosLoaded),
      tap( res => this.store.dispatch(new LoadingBusy({isLoading : true})) ),
      mergeMap(() => this.todosService.getAllEnhancedTodos()),
      map(todos => new AllTodosLoaded({todos :todos}))
    );
  @Effect()
  loadAllCoursesDone$ = this.action$
    .pipe(
      ofType<AllTodosLoaded>(TodoActionTypes.AllTodosLoaded),
      map( () => {
        return new ShowInfoMessage({message:  "All todo's loaded!", time : new Date()})
      })
    );
  @Effect()
  createNewTodo$ = this.action$
    .pipe(
      ofType<TodoCreateRequested>(TodoActionTypes.TodoCreateRequested),
      switchMap(action => {
        console.log("Todo : ",action.payload.todo);
        return this.todosService.createNewTodo(action.payload.todo)}),
      switchMap((todo : Todo) => this.todosService.enhanceTodoWithGiphy(todo)),
      map((todo: Todo) => {
        console.log("Saved Todo : ",todo);
        return new TodoCreatedDone({todo :todo});
      })
    );
  @Effect()
  createTodoDone$ = this.action$
    .pipe(
      ofType<TodoCreatedDone>(TodoActionTypes.TodoCreateDone),
      map( action => {
        return new ShowInfoMessage({message:  "New todo created!", time : new Date()})
      })
    );
  @Effect()
  deleteTodo$ = this.action$
    .pipe(
      ofType<TodoDeleteRequested>(TodoActionTypes.TodoDeleteRequested),
      switchMap( action => {
        console.log("Todo with id "+action.payload.id+" is requested to be deleted");
        return this.todosService.deleteTodoById(action.payload.id)
      }),
      map( (id : number) => {
        console.log("Todo with id "+id+" is deleted");
        return new TodoDeleteDone({id:id});
      })
    )
  @Effect()
  deleteTodoDone$ = this.action$
    .pipe(
      ofType<TodoDeleteDone>(TodoActionTypes.TodoDeleteDone),
      map( action => {
        console.log("Todo with id "+action.payload.id+" is requested to be deleted");
        return new ShowInfoMessage({message:  "Todo is deleted!", time : new Date()})
      })
    )
  @Effect()
  updateTodoStatus$ = this.action$
    .pipe(
      ofType<TodoUpdateStatusRequested>(TodoActionTypes.TodoUpdateStatusRequested),
      switchMap( action => {
        console.log("Todo Update Todo Status: ",action.payload.todo, " -> New status = ",action.payload.newStatus);
        return this.todosService.updateTodoStatus(action.payload.todo,action.payload.newStatus,action.payload.completedDate)
      }),
      map((todo : Todo) => {
        let todoUpdate : Update<Todo> = {id : todo.id, changes : todo}
        return new TodoUpdateDone({todoUpdate});
      })
    );
  @Effect()
  updateTodoTitleAndDescription$ = this.action$
    .pipe(
      ofType<TodoUpdateTitleAndDescriptionRequested>(TodoActionTypes.TodoUpdateTitleAndDescriptionRequested),
      switchMap( action => {
        console.log("Todo Update Todo Title and Description: ",action.payload.todo, " -> New Title and desc = ",action.payload.newTitle, " - ",action.payload.newDescription);
        return this.todosService.updateTodoTitleAndDescription(action.payload.todo,action.payload.newTitle,action.payload.newDescription)
      }),
      switchMap((todo : Todo) => this.todosService.enhanceTodoWithGiphy(todo)),
      map((todo : Todo) => {
        let todoUpdate : Update<Todo> = {id : todo.id, changes : todo}
        return new TodoUpdateDone({todoUpdate});
      })
    );
  @Effect()
  updateTodoDone$ = this.action$
    .pipe(
      ofType<TodoUpdateDone>(TodoActionTypes.TodoUpdateDone),
      map( () => {
        return new ShowInfoMessage({message:  "Todo Updated!", time : new Date()})
      })
    );
 constructor(private action$ : Actions, private todosService : TodoService, private giphyService : GiphyService, private store : Store<AppState>){}

}
