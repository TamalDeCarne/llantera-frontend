import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ReparacionDetalle } from 'src/app/models/reparaciondetalles';

@Component({
  selector: 'app-reparacion-detalles',
  templateUrl: './reparacion-detalles.component.html',
  styleUrls: ['./reparacion-detalles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReparacionDetallesComponent implements OnInit {

  detallesList : any = [];
  displayedColumns : string[] = [
    'nombre_parte',
    'cantidad'
  ];
  reparacionId : number;
  dataSource;
  styleParent : any = {
    display: 'contents'
  };
  extension: string = 'reparacionDetalles';
  constructor(
    private api: ApiLlanteraService,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<ReparacionDetallesComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.reparacionId = data.reparacionId
   }

  ngOnInit() {
    this.loadDetalles();
  }

  loadDetalles() {
    return this.api.getRows<ReparacionDetalle>(this.extension).subscribe(
      (data: {}) => {
        this.detallesList = data;
        this.detallesList = this.detallesList.filter((detalle) => detalle.reparacion_id === this.reparacionId);
        console.log(this.detallesList);
        this.dataSource = new MatTableDataSource<ReparacionDetalle>(this.detallesList);
      }
    );
  }

}
