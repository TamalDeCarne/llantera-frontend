import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})


@Injectable({
  providedIn: 'root'
})

export class UserUpdateComponent implements OnInit {

  @Input() username: string;

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UserUpdateComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.userId = data.userId;
    this.employeeId = data.employeeId;
  }

  userId: number;
  employeeId: number;
  userData: User;

  isLinear = true;
  secondStep: FormGroup;

  userTypes: any = [];
  employees: any = [];

  ngOnInit() {
    this.secondStep = this._formBuilder.group({
      nombre_usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
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
      (data: {}) => {
        this.userTypes = data;
      }
    );
  }

  loadEmployees() {
    return this.apiService.getEmployees().subscribe(
      (data: {}) => {
        this.employees = data;
        this.employees = this.employees.filter((employee) => employee.id === this.employeeId);
      }
    );
  }

  updateUser() {
    return this.apiService.updateUser(this.userId, this.secondStep.value).subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      });
  }

}
