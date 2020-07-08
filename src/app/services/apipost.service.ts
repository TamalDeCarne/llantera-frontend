import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApipostService {

  apiURL='https://6a6utpxla8.execute-api.us-west-2.amazonaws.com/alpha/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    })
  }
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User>{
    return this.http.get<User>(this.apiURL + 'usuarios')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error){
    let errorMessage = '';

    if (error.error instanceof ErrorEvent ){
      errorMessage = error.error.message;
      //!Error de Cliente
    }
    else {
      errorMessage = 'Error Code: '+ error.status +'\nMessage: '+ error.message;
      //!Error de Server
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
