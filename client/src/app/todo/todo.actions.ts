import {Action} from "@ngrx/store";
import {Todo} from "./model/todo";

export enum TodoActionTypes{
  AllTodosRequested = '[Todo List Page] All Todos Requested',
  AllTodosLoaded = '[Todos API] All Courses Loaded',
  TodoCreateRequested = '[Todo Create Modal] Todo Create Requested',
  TodoCreateDone = '[Todos API] Todo Create Done'
}



export class AllTodosRequested implements Action{
  readonly type = TodoActionTypes.AllTodosRequested;
}

export class AllTodosLoaded implements Action{
  readonly type = TodoActionTypes.AllTodosLoaded;
  constructor(public payload: {todos : Todo[]}){}
}

export class TodoCreateRequested implements Action{
  readonly type = TodoActionTypes.TodoCreateRequested;
  constructor(public payload: {todo : Todo}){}
}

export class TodoCreatedDone implements Action{
  readonly type = TodoActionTypes.TodoCreateDone;
  constructor(public payload: {todo : Todo}){}
}

export type TodoActions = AllTodosRequested | AllTodosLoaded | TodoCreateRequested | TodoCreatedDone

