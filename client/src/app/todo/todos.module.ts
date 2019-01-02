import {RouterModule, Routes} from "@angular/router";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {todosReducer} from "./todos.reducers";
import {EffectsModule} from "@ngrx/effects";
import {TodoService} from "./services/todo.service";
import {TodoEffects} from "./todo.effects";
import {GiphyService} from "./services/giphy.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export const todosRoutes: Routes = [
  {path: "",
  component: TodoListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(todosRoutes),
    StoreModule.forFeature('todos', todosReducer),
    EffectsModule.forFeature([TodoEffects]),
    FontAwesomeModule
  ],
  declarations: [TodoListComponent],
  exports : [TodoListComponent],
  entryComponents: [TodoListComponent],
  providers: [TodoService, GiphyService]
})

export class TodosModule {}
