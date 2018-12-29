import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {routerReducer} from "@ngrx/router-store";
import {storeFreeze} from "ngrx-store-freeze";
import {layoutReducer} from "./common/state/layout/layout.reducer";

export interface AppState{
}

export const reducers: ActionReducerMap<AppState> = {
  router : routerReducer,
  layout : layoutReducer
};

export const metaReducers : MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
