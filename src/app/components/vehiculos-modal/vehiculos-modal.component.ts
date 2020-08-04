import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiLlanteraService } from "src/app/services/api-llantera.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Vehiculo } from "src/app/models/vehiculo";
import { Client } from "src/app/models/client";


@Component({
  selector: "app-vehiculos-modal",
  templateUrl: "./vehiculos-modal.component.html",
  styleUrls: ["./vehiculos-modal.component.css"],
})
export class VehiculosModalComponent implements OnInit {
  isLinear = true;
  firstStep: FormGroup;
  clients: any;
  minDate: Date;
  maxDate: Date;
  carYears: number[];
  currentYear = new Date().getFullYear();

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VehiculosModalComponent>
  ) {}

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      cliente_id: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fecha_fabricacion: ["", [Validators.required]],
      modelo: ["", [Validators.required, Validators.maxLength(10)]],
    });
    this.getClients();
    this.carYears = Array.from(
      new Array(42),
      (x, i) => i + this.currentYear - 40
    );
  }

  insertVehicle() {
    if (this.firstStep.valid) {
      this.apiService
        .insertRow<Vehiculo>(this.firstStep.value, "vehiculo")
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  getClients() {
    return this.apiService
      .getRows<Client>("clientes")
      .subscribe((data: {}) => (this.clients = data));
  }
}
