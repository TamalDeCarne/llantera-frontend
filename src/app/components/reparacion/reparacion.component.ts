import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Reparacion } from 'src/app/models/reparacion';
import { ReparacionModalComponent } from '../reparacion-modal/reparacion-modal.component';

@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css']
})
export class ReparacionComponent implements OnInit {

  reparacionesList: any = [];
  displayedColumns : string[] = [
    'nombre_usuario', 
    'nombre_cliente', 
    'garantia', 
    'total', 
    'fecha_realizacion', 
    'reparacion_detalles', 
    'acciones'
  ];
  dataSource;
  extension = "reparaciones";
  constructor(
    private api: ApiLlanteraService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadReparaciones();
  }

  loadReparaciones(){
    return this.api.getRows<Reparacion>(this.extension).subscribe(
      (data: {}) => {
        this.reparacionesList = data;
        this.dataSource = new MatTableDataSource<Reparacion>(this.reparacionesList);
      }
    )
  }

  

  openModal() {
    const dialogRef1 = this.dialog.open(ReparacionModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if(dialogRef){
        this.loadReparaciones();
      }
    });

  }

}
