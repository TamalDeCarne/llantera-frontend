import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Parte } from 'src/app/models/parte';
import { PartesModalComponent } from '../partes-modal/partes-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PartesUpdateComponent } from '../partes-update/partes-update.component';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent implements OnInit {

  partsList: any = [];
  displayedColumns : string[] = ['nombre_parte', 'descripcion_parte', 'precio', 'denominacion_parte', 'acciones'];
  dataSource;
  constructor(
    private api : ApiLlanteraService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadParts();
  }

  loadParts() {
    return this.api.getRows<Parte>('partes').subscribe(
      (data: {}) => {
        this.partsList = data;
        this.dataSource = new MatTableDataSource<Parte>(this.partsList);
      }
    );
  }

  //TESTING
  openModal() {
    const dialogRef1 = this.dialog.open(PartesModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if(dialogRef){
        this.loadParts();
      }
    });

  }


//?FALTA TEST
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
        this.loadParts();
        });
      }
    })
  }

  //!AUN NO TERMINADO
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
              this.loadParts();
            }
          });
        }
      });
  }

}
