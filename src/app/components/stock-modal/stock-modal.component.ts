import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiLlanteraService } from "src/app/services/api-llantera.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Parte } from "src/app/models/parte";
import { Stock } from "src/app/models/inventario";

@Component({
  selector: "app-stock-modal",
  templateUrl: "./stock-modal.component.html",
  styleUrls: ["./stock-modal.component.css"],
})
export class StockModalComponent implements OnInit {
  isLinear = true;
  firstStep: FormGroup;
  parts: any;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StockModalComponent>
  ) {}

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      cantidad: ["", [Validators.required]],
      parte_id: ["", [Validators.required]],
    });
    this.getParts();
  }

  insertStock() {
    if (this.firstStep.valid) {
      this.apiService
        .insertRow<Stock>(this.firstStep.value, "inventario")
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  getParts() {
    return this.apiService
      .getRows<Parte>("partes")
      .subscribe((data: {}) => (this.parts = data));
  }
}
