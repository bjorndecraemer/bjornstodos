import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  getAllTodos() : Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/todos/');

  }
}
