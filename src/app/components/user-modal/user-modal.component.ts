import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApipostService } from 'src/app/services/apipost.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';



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
     private apiService: ApipostService,
     public dialog: MatDialog,
     public dialogRef: MatDialogRef<UserModalComponent>
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
      }
    );
  }

  loadEmployees() {
    return this.apiService.getEmployees().subscribe(
      (data: {}) =>{
        this.employees = data;
        this.employees = this.employees.filter((employee) => employee.usuario === null );
      }
    );
  }

  insertEmployee(){
    if(this.firstStep.valid){
      this.apiService.insertEmployee(this.firstStep.value).subscribe(
        (data: {}) =>{
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
          this.dialogRef.close(true);
        }
      );
    }
  }

}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-modal.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class UserUpdateComponent implements OnInit{

  
  @Input() username: string ;

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApipostService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UserUpdateComponent>,@Inject(MAT_DIALOG_DATA) data
    ) {
      this.userId = data.userId;
      this.employeeId = data.employeeId;
    }

    userId : number;
    employeeId: number;
  userData: User;
  
  isLinear = true;
  secondStep: FormGroup;
  
  userTypes: any = [];
  employees: any = [];
  
  ngOnInit() {
      this.secondStep = this._formBuilder.group({
      nombre_usuario: ['', [Validators.required]],
      contrasena : ['', [Validators.required]],
      empleado_id: ['', [Validators.required]],
      tipo_usuario_id: ['', [Validators.required]]
    });
    this.getUser();
    this.loadEmployees();
    this.loadUserTypes();
  }

  getUser() {
    return this.apiService.getUser(this.userId).subscribe(
      (data) => {
        this.userData = data;
        this.secondStep.patchValue({
          nombre_usuario: this.userData.nombre_usuario,
          empleado_id: this.userData.empleado.id,
          tipo_usuario_id: this.userData.tipo_usuario.id
        });
      })
  }

  loadUserTypes() {
    return this.apiService.getUserTypes().subscribe(
      (data: {}) =>{
        this.userTypes = data;
      }
    );
  }

  loadEmployees() {
    return this.apiService.getEmployees().subscribe(
      (data: {}) =>{
        this.employees = data;
        this.employees = this.employees.filter((employee) => employee.id === this.employeeId );
      }
    );
  }

  updateUser(){
    return this.apiService.updateUser(this.userId, this.secondStep.value).subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      });
  }
}