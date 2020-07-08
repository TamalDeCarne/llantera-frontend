import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShowPosts } from '../models/showposts';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL='https://jsonplaceholder.typicode.com/';
  apiURL='https://6a6utpxla8.execute-api.us-west-2.amazonaws.com/alpha/api/usuario';

  //injection del OBJ Http para manejar el baseURL
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    })
  }
  constructor(private http:HttpClient) { }

  getPosts(): Observable<ShowPosts>{
    return this.http.get<ShowPosts>(this.baseURL+'posts').pipe(retry(1), 
    catchError(this.errorHandler)
    );
  }

  postPost(jsonData): Observable<ShowPosts>{
    return this.http.post<ShowPosts>(this.baseURL + 'posts', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error){
    let errorMessage = '';

    if (error.error instanceof ErrorEvent ){
      errorMessage = error.error.message;
      //!Error de Cliente
    }
    else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
      //!Error de Server
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
