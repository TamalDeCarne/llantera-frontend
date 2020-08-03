import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiLlanteraService {

  apiURL='https://6a6utpxla8.execute-api.us-west-2.amazonaws.com/alpha/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    })
  }
  constructor(private http:HttpClient) { }

  getRows<T>(modelPath: string): Observable<T>{
    return this.http.get<T>(`${this.apiURL}${modelPath}`)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getRow<T>(id:number, modelPath: string): Observable<T>{
    return this.http.get<T>(`${this.apiURL}${modelPath}/${id}`, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteRow<T>(id:number, modelPath: string): Observable<T>{
    return this.http.delete<T>(`${this.apiURL}${modelPath}/${id}`, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertRow<T>(jsonData, modelPath: string): Observable<T>{
    return this.http.post<T>(`${this.apiURL}${modelPath}`, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateRow<T>(id: number, jsonData, modelPath: string): Observable<T>{
    return this.http.put<T>(`${this.apiURL}${modelPath}/${id}`, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error){
    let errorMessage = '';

    if (error.error instanceof ErrorEvent ){
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
