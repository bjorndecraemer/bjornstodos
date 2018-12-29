import {LayoutActions, LayoutActionTypes} from "./layout.actions";

export interface LayoutState{
  todoControlsActive : boolean,
  createTodoModalIsOpen : boolean
};

const initialState : LayoutState = {
  todoControlsActive : false,
  createTodoModalIsOpen : false
};

export function layoutReducer(state = initialState, action: LayoutActions) : LayoutState{
  switch(action.type){
    case LayoutActionTypes.ACTIVATE_TODO_CONTROLS :
      return {...state, todoControlsActive:true};
    case LayoutActionTypes.DEACTIVATE_TODO_CONTROLS :
      return {...state, todoControlsActive:false};
    case LayoutActionTypes.OPEN_CREATE_TODO_MODAL :
      return {...state, createTodoModalIsOpen:true};
    case LayoutActionTypes.CLOSE_CREATE_TODO_MODAL :
      return {...state, createTodoModalIsOpen:false};
    default : return state;
  }
}
