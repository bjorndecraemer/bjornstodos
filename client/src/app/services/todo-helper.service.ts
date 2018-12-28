import {Injectable} from '@angular/core';
import {Todo} from "../todo/model/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoHelperService {

  constructor() { }

  public generateTodoFromTitleAndDescription(title : string, description: string) : Todo{
    return {id: null,
      title:title,
      description:description,
      createdDate:new Date(),
      completedDate:null,
      completed:false,
      giphyUrl:null}
  }
}
