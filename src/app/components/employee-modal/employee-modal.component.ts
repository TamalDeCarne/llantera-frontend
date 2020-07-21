import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  nombre_usuario: string;
  isLinear = true;
  firstStep: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeModalComponent>
  ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.required]]
    });
  }

  insertEmployee() {
    if (this.firstStep.valid) {
      this.apiService.insertEmployee(this.firstStep.value).subscribe(
        (data: {}) => {
          this.dialogRef.close(true);
        }
      );
    }
  }

}
