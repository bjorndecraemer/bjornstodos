import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {routerReducer} from "@ngrx/router-store";
import {storeFreeze} from "ngrx-store-freeze";
import {layoutReducer} from "./common/layout/layout.reducer";
import {authReducer} from "./common/auth/state/auth.reducers";

export interface AppState{
}

export const reducers: ActionReducerMap<AppState> = {
  router : routerReducer,
  layout : layoutReducer,
  auth : authReducer
};

export const metaReducers : MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
