import {LayoutActions, LayoutActionTypes} from "./layout.actions";
import {Todo} from "../../../todo/model/todo";
import {MessageType} from "../../../todo/todo.selectors";

export interface LayoutState{
  todoControlsActive : boolean,
  createTodoModalIsOpen : boolean,
  modalIsEditMode : boolean,
  layoutLoadedTodo : Todo,
  layoutIsLoading : boolean,
  infoMessage : MessageType
};

const initialInfoMessage : MessageType = {message : "", time : null};

const initialState : LayoutState = {
  todoControlsActive : false,
  createTodoModalIsOpen : false,
  modalIsEditMode : false,
  layoutLoadedTodo : null,
  layoutIsLoading : false,
  infoMessage : initialInfoMessage
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
    case LayoutActionTypes.SHOW_INFO_MESSAGE :
      return {...state, infoMessage : action.payload};
    case LayoutActionTypes.RESET_INFO_MESSAGE :
      return {...state, infoMessage : initialInfoMessage};
    case LayoutActionTypes.LOADING_STATUS :
      return {...state, layoutIsLoading : action.payload.newLoadingStatus}
    default : return state;
  }
}
