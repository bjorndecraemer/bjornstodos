import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LayoutState} from "./layout.reducer";

export const selectLayoutState = createFeatureSelector<LayoutState>('layout');

export const selectTodoControlsAreActive = createSelector(
  selectLayoutState,
  (layoutState : LayoutState) => layoutState.todoControlsActive
);

export const selectTodoCreateModalOpen = createSelector(
  selectLayoutState,
  (layoutState : LayoutState) => layoutState.createTodoModalIsOpen
);

