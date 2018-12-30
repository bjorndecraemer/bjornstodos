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
import {faClipboardCheck, faPlus, faWrench} from "@fortawesome/free-solid-svg-icons";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarComponent} from "./navbar/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {faCheckCircle, faCircle, faTrashAlt} from "@fortawesome/free-regular-svg-icons";


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
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'})
  ],
  providers: [],
  exports : [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    library.add(faPlus);
    library.add(faCircle);
    library.add(faCheckCircle);
    library.add(faTrashAlt);
    library.add(faWrench);
    library.add(faClipboardCheck)
  }
}
