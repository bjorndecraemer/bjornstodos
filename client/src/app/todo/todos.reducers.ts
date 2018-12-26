import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Todo} from "./model/todo";
import {TodoActions, TodoActionTypes} from "./todo.actions";

export interface TodosState extends EntityState<Todo>{
  allTodosLoaded:boolean;
}

export const adapter : EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodosState : TodosState = adapter.getInitialState({
  allTodosLoaded:false
});

export function todosReducer(state = initialTodosState, action: TodoActions) : TodosState {
  switch (action.type) {
    case TodoActionTypes.AllTodosLoaded :
      return adapter.addAll(action.payload.todos, {...state, allTodosLoaded : true});
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
