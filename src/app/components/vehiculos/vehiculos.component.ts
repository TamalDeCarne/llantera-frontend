import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculosModalComponent } from '../vehiculos-modal/vehiculos-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { VehiculosUpdateComponent } from '../vehiculos-update/vehiculos-update.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  vehicleList: any = [];
  displayedColumns: string[] = ['modelo', 'descripcion', 'fecha_fabricacion', 'fecha_registro', 'acciones',];
  dataSource;


  constructor(private vehicleService: ApiLlanteraService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    return this.vehicleService.getVehicles().subscribe(
      (data: {}) => {
        this.vehicleList = data;
        this.dataSource = new MatTableDataSource<Vehiculo>(this.vehicleList);
      }
    );
  }

  getVehicles() {
    return this.vehicleService.getVehicle(12).subscribe(
      (data: {}) => {
        this.vehicleList.push(data)
        this.dataSource = new MatTableDataSource<Vehiculo>(this.vehicleList);
      }
    );
  }

  openModal() {
    const dialogRef1 = this.dialog.open(VehiculosModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if (dialogRef) {
        this.loadVehicles();
      }
    });

  }

  deleteVehicle(vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar un vehiculo',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.vehicleService.deleteVehicle(vehicle.id).subscribe((data: {}) => {
          this.loadVehicles();
        });

      }
    });
  }

  updateVehicle(vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de actualizar un vehiculo',
        message: '¿Estas seguro?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const dialogconfig = new MatDialogConfig();
        dialogconfig.data = {
          employeeId: vehicle.id,
        };
        const updatedialog = this.dialog.open(VehiculosUpdateComponent, dialogconfig);
        updatedialog.afterClosed().subscribe(dialogRef => {
          if (dialogRef) {
            this.loadVehicles();
          }
        });
      }
    });
  }
}
