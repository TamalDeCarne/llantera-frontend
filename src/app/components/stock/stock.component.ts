import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/inventario';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { StockModalComponent } from '../stock-modal/stock-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { StockUpdateComponent } from '../stock-update/stock-update.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stockList: any = [];
  displayedColumns: string[] = ['cantidad', 'descripcion_parte', 'nombre_parte', 'acciones',];
  dataSource;


  constructor(private stockService: ApiLlanteraService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadStock();
  }

  loadStock() {
    return this.stockService.getRows<Stock>('inventarios').subscribe(
      (data: {}) => {
        this.stockList = data;
        this.dataSource = new MatTableDataSource<Stock>(this.stockList);
      }
    );
  }

  openModal() {
    const dialogRef1 = this.dialog.open(StockModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if (dialogRef) {
        this.loadStock();
      }
    });

  }

  deleteStock(stock) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar inventario',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.stockService.deleteRow<Stock>(stock.id,'inventario').subscribe((data: {}) => {
          this.loadStock();
        });

      }
    });
  }

  updateModal(stock) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Estas a punto de actualizar el inventario del producto ${stock.parte.nombre_parte.toLowerCase()}`,
        message: '¿Estas seguro?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const dialogconfig = new MatDialogConfig();
        dialogconfig.data = {
          stockId: stock.id,
        };
        const updatedialog = this.dialog.open(StockUpdateComponent, dialogconfig);
        updatedialog.afterClosed().subscribe(dialogRef => {
          if (dialogRef) {
            this.loadStock();
          }
        });
      }
    });
  }

}
