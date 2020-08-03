import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeUpdateComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.employeeId = data.employeeId;
  }


  employeeId: number;
  employeeData: Employee;

  isLinear = true;
  firstStep: FormGroup;


  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.required]]
    });
    this.getEmployee();
  }

  getEmployee() {
    return this.apiService.getRow<Employee>(this.employeeId, 'empleado').subscribe(
      (data) => {

        this.employeeData = data;
        this.firstStep.patchValue({
          nombre: this.employeeData.nombre,
          apellidos: this.employeeData.apellidos,
          email: this.employeeData.email,
          telefono: this.employeeData.telefono,
          direccion: this.employeeData.direccion

        });
      })
  }

  updateEmployee() {
    return this.apiService.updateRow<Employee>(this.employeeId, this.firstStep.value, 'empleado').subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      });
  }
}
