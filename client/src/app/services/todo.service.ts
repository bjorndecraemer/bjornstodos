import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {TodoList} from "../todo/model/TodoList";
import {Todo} from "../todo/model/todo";
import {flatMap, map} from "rxjs/operators";
import {GiphyService} from "./giphy.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient, private giphyService : GiphyService) { }

  public getAllEnhancedTodos() : Observable<any[]>{

    return this.http.get('http://localhost:8080/api/v1/todos/').pipe(
      map((todoList : TodoList) => todoList.todolist),
      flatMap((todos : Todo[])=> {
          return forkJoin( todos.map((todo : Todo) => {
            return this.giphyService.get(todo)
          }
          )
        )
      }
      )
    )
  }

  public createNewTodo(todo : Todo) : Observable<Object>{
    return this.http.post('http://localhost:8080/api/v1/todos/create',todo);
  }

  public enhanceTodoWithGiphy(todo : Todo) : Observable<Todo>{
    return this.giphyService.get(todo);
  }

  public deleteTodoById(id : number) : Observable<Object>{
    return this.http.delete('http://localhost:8080/api/v1/todos/delete/'+id);
  }

  public updateTodoStatus(todo : Todo, newStatus : Boolean, newCompletedDate : Date) : Observable<Object>{
    return this.http.put('http://localhost:8080/api/v1/todos/update',{...todo, completed : newStatus.valueOf(), completedDate : newCompletedDate});
  }

  public updateTodoTitleAndDescription(todo : Todo, newTitle : string, newDescription : string) : Observable<Object>{
    return this.http.put('http://localhost:8080/api/v1/todos/update',{...todo,title : newTitle, description : newDescription});
  }


}
