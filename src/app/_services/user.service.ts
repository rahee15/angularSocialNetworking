import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable()
export class UserService {
    private _addUser="https://ddumicro.herokuapp.com/rest/node/addUser";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
        var param2={
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password,
            name:user.username
          }
          console.log("params 2 is "+param2);
          return this.http.post<any>(this._addUser,param2);
      
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}