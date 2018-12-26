import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromTodo from "./todos.reducers";
import {TodosState} from "./todos.reducers";

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const allTodosLoaded = createSelector(
  selectTodosState,
  todosState => todosState.allTodosLoaded
);

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodo.selectAll
);

