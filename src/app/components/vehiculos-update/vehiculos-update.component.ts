import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiLlanteraService } from "src/app/services/api-llantera.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Vehiculo } from "src/app/models/vehiculo";
import { Client } from "src/app/models/client";


@Component({
  selector: "app-vehiculos-update",
  templateUrl: "./vehiculos-update.component.html",
  styleUrls: ["./vehiculos-update.component.css"],
})
export class VehiculosUpdateComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<VehiculosUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.vehicleId = data.vehicleId;
  }

  vehicleId: number;
  vehicleData: Vehiculo;
  clients: any;
  isLinear = true;
  firstStep: FormGroup;
  carYears: number[];
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      cliente_id: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fecha_fabricacion: ["", [Validators.required]],
      modelo: ["", [Validators.required, Validators.maxLength(10)]],
    });
    this.getVehicle();
    this.getClients();
    this.carYears = Array.from(
      new Array(42),
      (x, i) => i + this.currentYear - 40
    );
  }

  getVehicle() {
    return this.apiService
      .getRow<Vehiculo>(this.vehicleId, "vehiculo")
      .subscribe((data) => {
        this.vehicleData = data;
        this.firstStep.patchValue({
          cliente_id: this.vehicleData.cliente_id,
          descripcion: this.vehicleData.descripcion,
          fecha_fabricacion: this.vehicleData.fecha_fabricacion,
          modelo: this.vehicleData.modelo,
        });
      });
  }

  updateVehicle() {
    return this.apiService
      .updateRow<Vehiculo>(this.vehicleId, this.firstStep.value, "vehiculo")
      .subscribe((data: {}) => {
        this.dialogRef.close(true);
      });
  }

  getClients() {
    return this.apiService.getRows<Client>("clientes").subscribe((data: {}) => {
      this.clients = data;
    });
  }
}
