import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Todo} from "./model/todo";
import {TodoActions, TodoActionTypes} from "./todo.actions";

export interface TodosState extends EntityState<Todo>{
  allTodosLoaded:boolean;
  loading:boolean;
  todoInfoMessage:string;
  todoInfoMessageTime:Date;
}

export const adapter : EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodosState : TodosState = adapter.getInitialState({
  allTodosLoaded:false,
  loading:false,
  todoInfoMessage:"",
  todoInfoMessageTime:null
});

export function todosReducer(state = initialTodosState, action: TodoActions) : TodosState {
  switch (action.type) {
    // Cases for Toodo loading
    case TodoActionTypes.AllTodosRequested :
      return {...state,loading:true};
    case TodoActionTypes.AllTodosLoaded :
      return adapter.addAll(action.payload.todos, {...state, allTodosLoaded : true, loading : false, todoInfoMessageTime : new Date(),todoInfoMessage : "All todo's loaded!"});
    case TodoActionTypes.AllTodosRequestFail :
      return {...state,loading:false, allTodosLoaded:false};
    // Cases for Toodo create
    case TodoActionTypes.TodoCreateRequested :
      return {...state,loading : true};
    case TodoActionTypes.ResetInfoMessageState :
      return {...state,todoInfoMessage : null};
    case TodoActionTypes.TodoCreateDone :
      return adapter.addOne( action.payload.todo,{...state, loading : false, todoInfoMessageTime : new Date(), todoInfoMessage : "New todo saved!"});
    case TodoActionTypes.TodoCreateRequestFail :
      return {...state,loading : false};
      // Cases for Toodo delete
    case TodoActionTypes.TodoDeleteRequested :
      return {...state, loading : true};
    case TodoActionTypes.TodoDeleteDone :
      return adapter.removeOne(action.payload.id,{...state, loading : false, todoInfoMessageTime : new Date(), todoInfoMessage : "Todo deleted!"});
    case TodoActionTypes.TodoDeleteRequestFail :
      return {...state, loading : false};
    case TodoActionTypes.TodoUpdateStatusRequested :
      return {...state, loading : true};
    case TodoActionTypes.TodoUpdateTitleAndDescriptionRequested :
      return {...state, loading : true};
    case TodoActionTypes.TodoUpdateDone :
      return adapter.updateOne(action.payload.todoUpdate, {...state, loading : false, todoInfoMessageTime : new Date(), todoInfoMessage : "Todo updated"});
    case TodoActionTypes.TodoUpdateFail :
      return {...state, loading : false};
    default : {
      return state;
    }
  }
}


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
