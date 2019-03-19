import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private _checkUser="https://ddumicro.herokuapp.com/rest/node/loginUser";
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        var param2={
            name1:username,
            name2:password
      
          } 
        return this.http.post<any>(this._checkUser, param2);
           
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}