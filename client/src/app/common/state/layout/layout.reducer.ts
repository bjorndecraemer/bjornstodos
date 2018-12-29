import {LayoutActions, LayoutActionTypes} from "./layout.actions";
import {Todo} from "../../../todo/model/todo";

export interface LayoutState{
  todoControlsActive : boolean,
  createTodoModalIsOpen : boolean,
  modalIsEditMode : boolean,
  layoutLoadedTodo : Todo,
  layoutIsLoading : boolean
};

const initialState : LayoutState = {
  todoControlsActive : false,
  createTodoModalIsOpen : false,
  modalIsEditMode : false,
  layoutLoadedTodo : null,
  layoutIsLoading : false
};

export function layoutReducer(state = initialState, action: LayoutActions) : LayoutState{
  switch(action.type){
    case LayoutActionTypes.ACTIVATE_TODO_CONTROLS :
      return {...state, todoControlsActive:true};
    case LayoutActionTypes.DEACTIVATE_TODO_CONTROLS :
      return {...state, todoControlsActive:false};
    case LayoutActionTypes.OPEN_CREATE_TODO_MODAL :
      return {...state, createTodoModalIsOpen:true, modalIsEditMode:false , layoutLoadedTodo:null};
    case LayoutActionTypes.OPEN_MODIFY_TODO_MODAL :
      return {...state, createTodoModalIsOpen:true , modalIsEditMode:true , layoutLoadedTodo:action.payload.todo};
    case LayoutActionTypes.CLOSE_CREATE_TODO_MODAL :
      return {...state, createTodoModalIsOpen:false};
    default : return state;
  }
}
