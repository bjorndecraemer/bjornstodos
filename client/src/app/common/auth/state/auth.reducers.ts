import {ApplicationUser} from "../model/application-user.model";
import {JWTBearer} from "../model/jwt-bearer.model";
import {AuthActions, AuthActionTypes} from "./auth.actions";

export interface AuthState{
  loggedIn : boolean,
  applicationUser : ApplicationUser,
  jwtBearer : JWTBearer
};

const initialState : AuthState = {
  loggedIn : false,
  applicationUser : null,
  jwtBearer : null
}

export function authReducer(state = initialState, action : AuthActions){
  switch(action.type){
    case AuthActionTypes.SIGNIN_DONE :
      return {...state, loggedIn : true, applicationUser : action.payload.user, jwtBearer : action.payload.jwtBearer};
    case AuthActionTypes.SIGNOUT_DONE :
      return {...initialState};
    default :
      return state;
  }
}
