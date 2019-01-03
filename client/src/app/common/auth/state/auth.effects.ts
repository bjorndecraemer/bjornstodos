import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {AuthService} from "../services/auth.service";
import {AuthActionTypes, SignupDone, SignupFailed, SignupRequested} from "./auth.actions";
import {map, mergeMap, switchMap, tap} from "rxjs/operators";
import {LoadingStatus, ShowInfoMessage} from "../../layout/layout.actions";
import {ApiResponseMessage, ApiResponseTechStatusCode} from "../../../todo/model/apiresponsetechstatuscode.model";

@Injectable()
export class AuthEffects{

  @Effect()
  signupNewUserReq$ = this.action$
    .pipe(
      ofType<SignupRequested>(AuthActionTypes.SIGNUP_REQUESTED),
      tap(() => this.store.dispatch(new LoadingStatus({newLoadingStatus : true}))),
      mergeMap(action => this.authService.signupNewApplicationUser(action.payload.user)),
      map((apiResponseMessage: ApiResponseMessage) => {
        if(apiResponseMessage.apiResponseTechStatusCode.valueOf() ===  ApiResponseTechStatusCode.SUCCESS){
          return new SignupDone({apiResponseMessage : apiResponseMessage})
        }
        else{
          return new SignupFailed({apiResponseMessage : apiResponseMessage})
        }
      })
    );
  @Effect()
   signupNewUserDone$ = this.action$
     .pipe(
       ofType<SignupDone>(AuthActionTypes.SIGNUP_DONE),
      switchMap(action => {
        return[
          new LoadingStatus({newLoadingStatus : false}),
          new ShowInfoMessage({message:  action.payload.apiResponseMessage.message, time : new Date()})
        ];
      })
     );
  @Effect()
  signupNewUserFail$ = this.action$
    .pipe(
      ofType<SignupFailed>(AuthActionTypes.SIGNUP_FAILED),
      switchMap(action => {
        return[
          new LoadingStatus({newLoadingStatus : false}),
          new ShowInfoMessage({message:  action.payload.apiResponseMessage.message, time : new Date()})
        ];
      })
    );
  constructor(private action$ : Actions, private authService : AuthService, private store : Store<AppState>){}

}
