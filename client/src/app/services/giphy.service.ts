import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Todo} from "../todo/model/todo";
import {Observable} from "rxjs";

@Injectable()
export class GiphyService {

  // Public beta key: https://github.com/Giphy/GiphyAPI#public-beta-key
  giphyApi = '//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=';

  constructor(public http: HttpClient) {
  }

  get(todo : Todo) : Observable<Todo> {
    const apiLink = this.giphyApi + todo.description;
    return this.http.get(apiLink).pipe(map((response: any) => {
      if (response.data.length > 0) {
        todo.giphyUrl = response.data[0].images.original.url;
      } else {
        todo.giphyUrl = 'https://media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif'; // dancing cat for 404
      }
      return todo;
    }));
  }
}
