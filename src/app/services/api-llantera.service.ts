import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserType } from '../models/usertype';
import { Employee } from '../models/employee';
import { Client } from '../models/client';
import { Vehiculo } from '../models/vehiculo';

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

  getEmployee(id): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + 'empleado/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertEmployee(jsonData): Observable<Employee>{
    return this.http.post<Employee>(this.apiURL + 'empleado', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateEmployee(employeeId, jsonData): Observable<Employee>{
    return this.http.put<Employee>(this.apiURL + 'empleado/' + employeeId, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertUser(jsonData): Observable<User>{
    return this.http.post<User>(this.apiURL + 'usuario', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateUser(userId, jsonData): Observable<User>{
    return this.http.put<User>(this.apiURL + 'usuario/' + userId, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteUser(id): Observable<User>{
    return this.http.delete<User>(this.apiURL + 'usuario/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteEmployee(id): Observable<Employee>{
    return this.http.delete<Employee>(this.apiURL + 'empleado/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getClients(): Observable<Client>{
    return this.http.get<Client>(this.apiURL + 'clientes')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(this.apiURL + 'cliente/'+id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteClient(id): Observable<Client>{
    return this.http.delete<Client>(this.apiURL + 'cliente/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertClient(jsonData): Observable<Client>{
    return this.http.post<Client>(this.apiURL + 'cliente', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateClient(userId, jsonData): Observable<Client>{
    return this.http.put<Client>(this.apiURL + 'cliente/' + userId, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getVehicles(): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(this.apiURL + 'vehiculos')
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getVehicle(id): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(this.apiURL + 'vehiculo/'+id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteVehicle(id): Observable<Vehiculo>{
    return this.http.delete<Vehiculo>(this.apiURL + 'vehiculo/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertVehicle(jsonData): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(this.apiURL + 'vehiculo', jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateVehicle(userId, jsonData): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(this.apiURL + 'vehiculo/' + userId, jsonData, this.httpOptions)
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
