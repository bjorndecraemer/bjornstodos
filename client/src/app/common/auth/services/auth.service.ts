import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApplicationUser} from "../model/application-user.model";
import {Observable} from "rxjs";

@Injectable()
export class AuthService{

  constructor(private http : HttpClient){}

  public signupNewApplicationUser(newUser : ApplicationUser) : Observable<Object>{
    return this.http.post('http://localhost:8080/users/signup',newUser);
  }
}
