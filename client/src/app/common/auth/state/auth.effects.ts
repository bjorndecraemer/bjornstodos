import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {AuthService} from "../services/auth.service";
import {AuthActionTypes, SignupDone, SignupRequested} from "./auth.actions";
import {map, switchMap, tap} from "rxjs/operators";
import {LoadingStatus} from "../../layout/layout.actions";

@Injectable()
export class AuthEffects{

  @Effect()
  signupNewUserReq$ = this.action$
    .pipe(
      ofType<SignupRequested>(AuthActionTypes.SIGNUP_REQUESTED),
      tap(() => this.store.dispatch(new LoadingStatus({newLoadingStatus : true}))),
      switchMap(action => {
        return this.authService.signupNewApplicationUser(action.payload.user)}),
      map(()=> new SignupDone())
    );
  // @Effect()
  // signupNewUserDone$ = this.action$
  //   .pipe(
  //     ofType<SignupDone>(AuthActionTypes.SIGNUP_DONE),
  //     tap(action => {
  //       console.log()
  //       this.store.dispatch(new LoadingStatus({newLoadingStatus : false}));
  //       this.store.dispatch(new ShowInfoMessage({message:  "All todo's loaded!", time : new Date()}));
  //     })
  //
  //     )
  //   ;
  constructor(private action$ : Actions, private authService : AuthService, private store : Store<AppState>){}

}
