import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserType } from '../models/usertype';
import { Employee } from '../models/employee';

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

  getUsers(): Observable<User>{
    return this.http.get<User>(this.apiURL + 'usuarios')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.apiURL + 'usuario/'+id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getUserTypes(): Observable<UserType>{
    return this.http.get<UserType>(this.apiURL + 'tiposUsuario')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getEmployees(): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + 'empleados')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertEmployee(jsonData): Observable<Employee>{
    return this.http.post<Employee>(this.apiURL + 'empleado', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertUser(jsonData): Observable<User>{
    return this.http.post<User>(this.apiURL + 'usuario', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateEmployee(jsonData): Observable<Employee>{
    return this.http.put<Employee>(this.apiURL + 'empleado/' + jsonData.id, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateUser(userId, jsonData): Observable<User>{
    return this.http.put<User>(this.apiURL + 'usuario/' + userId, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteUsuario(id): Observable<User>{
    return this.http.delete<User>(this.apiURL + 'usuario/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteEmpleado(id): Observable<Employee>{
    return this.http.delete<Employee>(this.apiURL + 'empleado/' + id, this.httpOptions)
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
