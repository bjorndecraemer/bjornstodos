import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {GiphyService} from "../../services/giphy.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos : Array<any>;

  constructor(private todoService : TodoService, private giphyService : GiphyService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(
      data => {
        this.todos = data.todolist;
        for(let todo of this.todos){
          this.giphyService.get(todo.description).subscribe(url => todo.giphyUrl = url);
        }
        },
      error => console.error(error)
    )
  }

}
