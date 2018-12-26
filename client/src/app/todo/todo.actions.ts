import {Action} from "@ngrx/store";
import {Todo} from "./model/todo";

export enum TodoActionTypes{
  AllTodosRequested = '[Todo List Page] All Todos Requested',
  AllTodosLoaded = '[Todos API] All Courses Loaded'
}



export class AllTodosRequested implements Action{
  readonly type = TodoActionTypes.AllTodosRequested;
}

export class AllTodosLoaded implements Action{
  readonly type = TodoActionTypes.AllTodosLoaded;
  constructor(public payload: {todos : Todo[]}){}
}

export type TodoActions = AllTodosRequested | AllTodosLoaded

