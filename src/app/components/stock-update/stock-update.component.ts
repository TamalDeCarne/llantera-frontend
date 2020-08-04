import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiLlanteraService } from "src/app/services/api-llantera.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Stock } from "src/app/models/inventario";
import { Parte } from "src/app/models/parte";

@Component({
  selector: "app-stock-update",
  templateUrl: "./stock-update.component.html",
  styleUrls: ["./stock-update.component.css"],
})
export class StockUpdateComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<StockUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.stockId = data.stockId;
  }

  stockId: number;
  stockData: Stock;
  parts: any;
  isLinear = true;
  firstStep: FormGroup;

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      parte_id: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
    });
    this.getStock();
    this.getParts();
  }

  getStock() {
    return this.apiService
      .getRow<Stock>(this.stockId, "inventario")
      .subscribe((data) => {
        this.stockData = data;
        this.firstStep.patchValue({
          parte_id: this.stockData.parte.id,
          cantidad: this.stockData.cantidad,
        });
      });
  }

  updateStock() {
    return this.apiService
      .updateRow<Stock>(this.stockId, this.firstStep.value, "inventario")
      .subscribe((data: {}) => {
        this.dialogRef.close(true);
      });
  }

  getParts() {
    return this.apiService.getRows<Parte>("partes").subscribe((data: {}) => {
      this.parts = data;
    });
  }
}
