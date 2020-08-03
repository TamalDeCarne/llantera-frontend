import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { UserType } from 'src/app/models/usertype';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit{

  nombre_usuario: string;
  isLinear = true;
  firstStep: FormGroup;
  secondStep: FormGroup;

  userTypes: any = [];
  employees: any = [];

  constructor(private _formBuilder: FormBuilder,
     private apiService: ApiLlanteraService,
     public dialog: MatDialog,
     public dialogRef: MatDialogRef<UserModalComponent>
     ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
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
    return this.apiService.getRows<UserType>('tiposUsuario').subscribe(
      (data: {}) =>{
        this.userTypes = data;
      }
    );
  }

  loadEmployees() {
    return this.apiService.getRows<Employee>('empleados').subscribe(
      (data: {}) =>{
        this.employees = data;
        this.employees = this.employees.filter((employee) => employee.usuario === null );
      }
    );
  }

  insertEmployee(){
    if(this.firstStep.valid){
      this.apiService.insertRow<Employee>(this.firstStep.value,'empleado').subscribe(
        (data: {}) =>{
          this.loadUserTypes();
          this.loadEmployees();
        }
      )
    }
  }

  insertUser() {
    if(this.secondStep.valid){
      this.apiService.insertRow<User>(this.secondStep.value, 'usuario').subscribe(
        (data: {}) => {
          this.dialogRef.close(true);
        }
      );
    }
  }

}

