import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./state/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import {AuthService} from "./services/auth.service";

@NgModule({
  imports : [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers : [AuthService]
})

export class AuthModule {}
