import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiLlanteraService } from "src/app/services/api-llantera.service";
import { MatDialog, MatDialogRef, MatTableDataSource } from "@angular/material";
import { Employee } from "src/app/models/employee";
import { Client } from "src/app/models/client";
import { User } from "src/app/models/user";
import { ReparacionDetalle } from "src/app/models/reparaciondetalles";
import { Parte } from "src/app/models/parte";
import { Reparacion } from "src/app/models/reparacion";
import { Garantia } from "src/app/models/garantia";

export interface DetallesReparacion {
  parte_id: Parte;
  cantidad: number;
}

@Component({
  selector: "app-reparacion-modal",
  templateUrl: "./reparacion-modal.component.html",
  styleUrls: ["./reparacion-modal.component.css"],
})
export class ReparacionModalComponent implements OnInit {
  isLinear = true;
  detalle: DetallesReparacion;
  firstStep: FormGroup;
  secondStep: FormGroup;
  detallesList: any = [];
  usuarios: any = [];
  clientes: any = [];
  partes: any = [];
  displayedColumns: string[] = ["nombre_parte", "cantidad", "acciones"];
  detallesDS;
  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReparacionModalComponent>
  ) {}

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      usuario_id: ["", [Validators.required]],
      cliente_id: ["", [Validators.required]],
    });
    this.secondStep = this._formBuilder.group({
      parte: ["", [Validators.required]],
      cantidad: ["", [Validators.min(1), Validators.max(20)]],
    });
    this.loadUsers();
    this.loadClients();
    this.loadPartes();
  }

  loadUsers() {
    return this.api.getRows<User>("usuarios").subscribe((data: {}) => {
      this.usuarios = data;
    });
  }

  loadClients() {
    return this.api.getRows<Client>("clientes").subscribe((data: {}) => {
      this.clientes = data;
      console.log(this.clientes);
    });
  }

  loadPartes() {
    return this.api.getRows<Parte>("partes").subscribe((data: {}) => {
      this.partes = data;
    });
  }

  insertData() {

    if (this.detallesList.length) {

    }
    let jsonRepairData = this.firstStep.value;
    let model;

    this.api.insertRow<Garantia>({}, "garantia").subscribe((data: {}) => {
      model = data;
      jsonRepairData["garantia_id"] = model["id"];
      jsonRepairData["total"] = this.detallesList
        .map((detalle) => detalle.cantidad * detalle.parte.precio)
        .reduce((a, b) => a + b, 0);
     this.insertReparacion(jsonRepairData);
    });
  }

  insertReparacion(jsonRepairData:{}) {
    let model;
    this.api
    .insertRow<Reparacion>(jsonRepairData, "reparacion")
    .subscribe((data: {}) => {
      model = data;
      this.insertDetalles(model.id);
    });

  }

  insertDetalles(reparacionId: number) {
    for (let detalle of this.detallesList) {
      const postJson = {
        reparacion_id: reparacionId,
        parte_id: detalle.parte.id,
        cantidad: detalle.cantidad,
      };
      this.api
        .insertRow<ReparacionDetalle>(postJson, "reparacionDetalle")
        .subscribe(() => {});
    }
  }

  agregarDetalle() {
    const detalleIsValid = this.secondStep.valid;
    if (detalleIsValid) {
      const detalle = this.secondStep.value;
      this.detallesList.push(detalle);
      this.refreshTable();
    }
  }

  deleteDetalle() {
    this.detallesList.pop();
    this.refreshTable();
  }

  refreshTable() {
    this.detallesDS  = new MatTableDataSource<DetallesReparacion>(this.detallesList);
  }
}
