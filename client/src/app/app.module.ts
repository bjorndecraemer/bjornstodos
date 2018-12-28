import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {metaReducers, reducers} from "./app.state";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: 'todos',
    loadChildren: './todo/todos.module#TodosModule'
  }
  ,
  {path : "", component : HomeComponent},
  {path: "**",
    redirectTo: '/todos'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    library.add(faPlus);
  }
}
