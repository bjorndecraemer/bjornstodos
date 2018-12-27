import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.service';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../app.state";
import {environment} from "../../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {GiphyService} from "./giphy.service";

describe('TodoService', () => {

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

  beforeEach(() => TestBed.configureTestingModule(


    {declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'})
      ],
      providers: [TodoService, GiphyService]
      }
    ));

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});
