import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromTodo from "./todos.reducers";
import {TodosState} from "./todos.reducers";

export const selectTodosState = createFeatureSelector<TodosState>('todos');


export const isLoading = createSelector(
  selectTodosState,
  todosState => todosState.loading
)

export const allTodosLoaded = createSelector(
  selectTodosState,
  todosState => todosState.allTodosLoaded
);

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodo.selectAll
);

export const selectAllOpenTodos = createSelector(
  selectAllTodos,
  todos => todos.filter(todo => !todo.completed)
);
export const selectAllCompletedTodos = createSelector(
  selectAllTodos,
  todos => todos.filter(todo => todo.completed)
);

