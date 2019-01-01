import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Todo} from "./model/todo";
import {TodoActions, TodoActionTypes} from "./todo.actions";

export interface TodosState extends EntityState<Todo>{
  allTodosLoaded:boolean;
  loading:boolean;
}

export const adapter : EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodosState : TodosState = adapter.getInitialState({
  allTodosLoaded:false,
  loading:false,
});

export function todosReducer(state = initialTodosState, action: TodoActions) : TodosState {
  switch (action.type) {
    // Cases for Toodo loading
    case TodoActionTypes.AllTodosRequested :
      return state;
    case TodoActionTypes.AllTodosLoaded :
      return adapter.addAll(action.payload.todos, state);
    case TodoActionTypes.AllTodosRequestFail :
      return {...state,loading:false, allTodosLoaded:false};
    // Cases for Toodo create
    case TodoActionTypes.TodoCreateDone :
      return adapter.addOne( action.payload.todo,state);
      // Cases for Toodo delete
    case TodoActionTypes.TodoDeleteDone :
      return adapter.removeOne(action.payload.id, state);
    case TodoActionTypes.TodoUpdateDone :
      return adapter.updateOne(action.payload.todoUpdate, state);
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
