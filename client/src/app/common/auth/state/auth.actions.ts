import {Action} from "@ngrx/store";
import {ApplicationUser} from "../model/application-user.model";
import {JWTBearer} from "../model/jwt-bearer.model";

export enum AuthActionTypes {
  SIGNUP_REQUESTED = '[Signup View] Signup Requested',
  SIGNUP_DONE = '[API] Signup Done',
  SIGNUP_FAILED = '[API] Signup Fail',
  SIGNIN_REQUESTED = '[Sign-in View] Sign-in Requested',
  SIGNIN_DONE = '[API] Sign-in Done',
  SIGNIN_FAILED = '[API] Sign-in Fail',
  SIGNOUT_REQUESTED = '[Navbar View] Sign-out Requested',
  SIGNOUT_DONE = '[API] Sign-out Done',
  SIGNOUT_FAILED = '[API] Sign-out Fail',
}

export class SignupRequested implements Action{
  readonly type = AuthActionTypes.SIGNUP_REQUESTED;
  constructor(public payload : {user: ApplicationUser}){};
}
  export class SignupDone implements Action{
  readonly type = AuthActionTypes.SIGNUP_DONE;
}
export class SignupFailed implements Action{
  readonly type = AuthActionTypes.SIGNUP_FAILED;
}
export class SigninRequested implements Action{
  readonly type = AuthActionTypes.SIGNIN_REQUESTED;
  constructor(public payload : {user: ApplicationUser}){};
}
export class SigninDone implements Action{
  readonly type = AuthActionTypes.SIGNIN_DONE;
  constructor(public payload : {user: ApplicationUser, jwtBearer : JWTBearer}){}
}
export class SigninFailed implements Action{
  readonly type = AuthActionTypes.SIGNIN_FAILED;
  constructor(public payload : {error: string}){};
}
export class SignoutRequested implements Action{
  readonly type = AuthActionTypes.SIGNOUT_REQUESTED;
}
export class SignoutDone implements Action{
  readonly type = AuthActionTypes.SIGNOUT_DONE;
}
export class SignoutFailed implements Action{
  readonly type = AuthActionTypes.SIGNOUT_FAILED;
  constructor(public payload : {error: string}){};
}

export type AuthActions =
SignoutRequested
| SignupDone
| SignupFailed
| SigninRequested
| SigninDone
| SigninFailed
| SignoutRequested
| SignoutDone
| SignoutFailed;
