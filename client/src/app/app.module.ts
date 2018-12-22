import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import {TodoService} from "./services/todo.service";
import {GiphyService} from "./services/giphy.service";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TodoService, GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
