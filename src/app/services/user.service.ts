import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }


  getUserLists() {

    return this.http.get('/api/users').pipe(map((result) => result.json().message));

  }

  addUsers(data) {

    return this.http.post('/api/users', data).pipe(map((result) => result.json()));

  }

  editUsers(id: string) {

    return this.http.get('/api/users/' + id).pipe(map((result) => result.json().message));

  }

  updateUsers(data) {

    return this.http.put('/api/users', data).pipe(map((result) => result.json()));

  }

  deleteUsers(id: string) {

    return this.http.delete('/api/users/' + id).pipe(map((result) => result.json()));

  }


}
