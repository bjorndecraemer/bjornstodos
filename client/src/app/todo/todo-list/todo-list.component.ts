import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../model/todo";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {AllTodosRequested} from "../todo.actions";
import {selectAllTodos} from "../todo.selectors";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$ : Observable<Todo[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AllTodosRequested());
    this.todos$ = this.store.pipe(select(selectAllTodos));


    // this.todoService.getAllTodos().subscribe(
    //   data => {
    //     this.todos = data.todolist;
    //     for(let todo of this.todos){
    //       this.giphyService.get(todo.description).subscribe(url => todo.giphyUrl = url);
    //     }
    //     },
    //   error => console.error(error)
    // )
  }

}
