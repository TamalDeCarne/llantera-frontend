import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vehiculo-cliente',
  templateUrl: './vehiculo-cliente.component.html',
  styleUrls: ['./vehiculo-cliente.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VehiculoClienteComponent implements OnInit {
  detallesList: any = [];
  displayedColumns: string[] = [
    'modelo',
    'fecha_fabricacion',
    'descripcion'
  ];
  vehiculo;
  dataSource;
  styleParent: any = {
    display: 'contents'
  };
  constructor(
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataSource = [];
    this.dataSource.push(data.vehiculo)
  }

  ngOnInit() {
    

  }
  
}
