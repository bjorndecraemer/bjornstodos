import {Action} from "@ngrx/store";
import {Todo} from "./model/todo";
import {Update} from "@ngrx/entity";

export enum TodoActionTypes{
  AllTodosRequested = '[Todo List Page] All Todos Requested',
  AllTodosLoaded = '[Todos API] All Courses Loaded',
  AllTodosRequestFail = '[Todos API] All Todos Request Fail',
  LoadingBusy = '[Todo View Component] Loading Busy',
  TodoCreateRequested = '[Todo Create Modal] Todo Create Requested',
  TodoCreateDone = '[Todos API] Todo Create Done',
  TodoCreateRequestFail = '[Todos API] Todo Create Request Fail',
  TodoDeleteRequested = '[Todo List Page] Todo Delete Requested',
  TodoDeleteDone = '[Todos API] Todo Delete Done',
  TodoDeleteRequestFail = '[Todos API] Todo Delete Request Fail',
  TodoUpdateStatusRequested = '[Todo List Page] Todo Update Status Requested',
  TodoUpdateTitleAndDescriptionRequested = '[Todo List Page] Todo Update Title and Description Requested',
  TodoUpdateDone = '[Todo API] Todo Update Done',
  TodoUpdateFail = '[Todo API] Todo Update Fail'
}

export class LoadingBusy implements Action{
  readonly type = TodoActionTypes.LoadingBusy;
  constructor(public payload: {isLoading : boolean}){}
}
export class AllTodosRequested implements Action{
  readonly type = TodoActionTypes.AllTodosRequested;
}

export class AllTodosLoaded implements Action{
  readonly type = TodoActionTypes.AllTodosLoaded;
  constructor(public payload: {todos : Todo[]}){}
}

export class AllTodosRequestFail implements Action{
  readonly type = TodoActionTypes.AllTodosRequestFail;
}

export class TodoCreateRequested implements Action{
  readonly type = TodoActionTypes.TodoCreateRequested;
  constructor(public payload: {todo : Todo}){}
}

export class TodoCreatedDone implements Action{
  readonly type = TodoActionTypes.TodoCreateDone;
  constructor(public payload: {todo : Todo}){}
}
export class TodoCreateRequestFail implements Action{
  readonly type = TodoActionTypes.TodoCreateRequestFail;
}

export class TodoDeleteRequested implements Action{
  readonly type = TodoActionTypes.TodoDeleteRequested;
  constructor(public payload: {id : number}){}
}
export class TodoDeleteDone implements Action{
  readonly type = TodoActionTypes.TodoDeleteDone;
  constructor(public payload: {id : number}){}
}
export class TodoDeleteRequestFail implements Action{
  readonly type = TodoActionTypes.TodoDeleteRequestFail;
}

export class TodoUpdateStatusRequested implements Action{
  readonly type = TodoActionTypes.TodoUpdateStatusRequested;
  constructor(public payload : {todo:Todo, newStatus : Boolean, completedDate : Date}){}
}
export class TodoUpdateTitleAndDescriptionRequested implements Action{
  readonly type = TodoActionTypes.TodoUpdateTitleAndDescriptionRequested;
  constructor(public payload : {todo:Todo, newTitle : string, newDescription : string}){}
}
export class TodoUpdateDone implements Action{
  readonly type = TodoActionTypes.TodoUpdateDone;
  constructor(public payload : {todoUpdate: Update<Todo>}){}
}
export class TodoUpdateFail implements Action{
  readonly type = TodoActionTypes.TodoUpdateFail;
}

export type TodoActions =
  | AllTodosRequested
  | AllTodosLoaded
  | AllTodosRequestFail
  | TodoCreateRequested
  | TodoCreatedDone
  | TodoCreateRequestFail
  | TodoDeleteRequested
  | TodoDeleteDone
  | TodoDeleteRequestFail
  | TodoUpdateStatusRequested
  | TodoUpdateTitleAndDescriptionRequested
  | TodoUpdateDone
  | TodoUpdateFail
  | LoadingBusy
