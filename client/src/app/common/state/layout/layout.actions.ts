import {Action} from "@ngrx/store";
import {Todo} from "../../../todo/model/todo";

export enum LayoutActionTypes {
  ACTIVATE_TODO_CONTROLS = '[Navbar Component] Activate Todo Controls',
  DEACTIVATE_TODO_CONTROLS = '[Navbar Component] Deactivate Todo Controls',
  OPEN_CREATE_TODO_MODAL = "[Layout] Open Create Todo modal",
  OPEN_MODIFY_TODO_MODAL = "Layout Open Modify Todo modal",
  CLOSE_CREATE_TODO_MODAL = "[Layout] Close Create Todo modal"
};

export class ActivateTodoControls implements Action{
  readonly type = LayoutActionTypes.ACTIVATE_TODO_CONTROLS;
}
export class DeActivateTodoControls implements Action{
  readonly type = LayoutActionTypes.DEACTIVATE_TODO_CONTROLS;
}
export class OpenCreateTodoModal implements Action{
  readonly type = LayoutActionTypes.OPEN_CREATE_TODO_MODAL;
}
export class CloseCreateTodoModal implements Action{
  readonly type = LayoutActionTypes.CLOSE_CREATE_TODO_MODAL;
}
export class OpenModifyTodoModal implements Action{
  readonly type = LayoutActionTypes.OPEN_MODIFY_TODO_MODAL;
  constructor(public payload : {todo:Todo}){}
}


export type LayoutActions =
  ActivateTodoControls
  | DeActivateTodoControls
  | OpenCreateTodoModal
  | CloseCreateTodoModal
  | OpenModifyTodoModal
  ;
