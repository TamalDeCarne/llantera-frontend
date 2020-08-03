import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Parte } from 'src/app/models/parte';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PartesUpdateComponent } from '../partes-update/partes-update.component';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css']
})
export class MotorComponent implements OnInit {

  motorList: any = [];
  displayedColumns : string[] = [
    'nombre_parte',
   'descripcion_parte',
    'precio',
    'acciones'
  ];

  dataSource;
  extension: string = "partes";

  constructor(
    private api: ApiLlanteraService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadMotor();
  }

  loadMotor() {

    return this.api.getRows<Parte>(this.extension).subscribe((data: {}) => {
      this.motorList = data;
      this.motorList = this.motorList.filter(
        (motor) => motor.tipo_parte.id === 1
      );

      this.dataSource = new MatTableDataSource<Parte>(this.motorList);
    });
  }

  
  deleteParte(parte){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar una parte',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        return this.api.deleteRow<Parte>(parte.id, 'parte').subscribe((data: {}) => {
        this.deleteParte(parte.id);
        this.loadMotor();
        });
      }
    })
  }

  updateModal(parte){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Estas a punto de actualizar una parte',
          message: '¿Estas seguro?'
        }
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          const dialogconfig = new MatDialogConfig();
          dialogconfig.data = {
            parteId: parte.id
          };
          const updatedialog = this.dialog.open(PartesUpdateComponent, dialogconfig);
          updatedialog.afterClosed().subscribe(dialogRef => {
            if(dialogRef){
              this.loadMotor();
            }
          });
        }
      });
  }

}
