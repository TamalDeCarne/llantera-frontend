import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef } from '@angular/material';
//TODO Date picker validation
@Component({
  selector: 'app-vehiculos-modal',
  templateUrl: './vehiculos-modal.component.html',
  styleUrls: ['./vehiculos-modal.component.css']
})
export class VehiculosModalComponent implements OnInit {

  isLinear = true;
  firstStep: FormGroup;
  clients: any;
  minDate: Date;
  maxDate: Date;
  carYears: number[];
  currentYear = new Date().getFullYear()

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VehiculosModalComponent>
  ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      cliente_id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha_fabricacion: ['', [Validators.required]],
      modelo: ['', [Validators.required, Validators.maxLength(10)]],
    });
    this.getClients();
    this.carYears = Array.from(new Array(42), (x,i) => i + this.currentYear - 40);
  }

  insertVehicle() {
    if (this.firstStep.valid) {
      console.log(this.firstStep.value);
      this.apiService.insertVehicle(this.firstStep.value).subscribe(
        (data: {}) => {
          this.dialogRef.close(true);
        }
      );
    }
  }

  getClients() {
    return this.apiService.getClients().subscribe(
      (data: {}) =>{
        this.clients = data;
      }
    );
  }

}
