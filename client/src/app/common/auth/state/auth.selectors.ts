import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  authState => authState.loggedIn
);

export const selectLoggedInApplicationUser = createSelector(
  selectAuthState,
  authState => authState.applicationUser
);

export const selectJwtBearer = createSelector(
  selectAuthState,
  authState => authState.jwtBearer
);
