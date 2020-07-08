import { Component, OnInit } from '@angular/core';
import { UserTypeComponent } from './user-type.component';
import { EmployeeModalComponent } from './employee-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApipostService } from 'src/app/services/apipost.service';
import { MatDialog } from '@angular/material';
import { UsersComponent } from '../users/users.component';

export interface UserModalComponent {
  nombre_usuario: string;
  empleado: EmployeeModalComponent;
  tipo_usuario: UserTypeComponent;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit{

  nombre_usuario: string;
  empleado: EmployeeModalComponent;
  tipo_usuario: UserTypeComponent;
  
  isLinear = false;
  firstStep: FormGroup;
  secondStep: FormGroup;
  
  userTypes: any = [];
  employees: any = [];

  constructor(private _formBuilder: FormBuilder,
     private apiService: ApipostService,
     public dialog: MatDialog
     ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
    this.secondStep = this._formBuilder.group({
      nombre_usuario: ['', [Validators.required]],
      contrasena : ['', [Validators.required]],
      empleado_id: ['', [Validators.required]],
      tipo_usuario_id: ['', [Validators.required]]
    });
  }

  loadUserTypes() {
    return this.apiService.getUserTypes().subscribe(
      (data: {}) =>{
        this.userTypes = data;
        console.log(this.userTypes);
      }
    );
  }

  loadEmployees() {
    return this.apiService.getEmployees().subscribe(
      (data: {}) =>{
        this.employees = data;
        this.employees = this.employees.filter((employee) => employee.usuario === null );
        console.log(this.employees);
      }
    );
  }

  insertEmployee(){
    if(this.firstStep.valid){
      this.apiService.insertEmployee(this.firstStep.value).subscribe(
        (data: {}) =>{
          console.log(data);
          this.loadUserTypes();
          this.loadEmployees();
        }
      )
    }
  }

  insertUser() {
    if(this.secondStep.valid){
      this.apiService.insertUser(this.secondStep.value).subscribe(
        (data: {}) => {
          console.log(data);
          this.usercomp.loadUsers();
        }
      );
    }
  }

}