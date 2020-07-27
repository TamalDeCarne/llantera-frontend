import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {
  
  garantias: any = [];
  displayedColumns : string[] = ['fecha_inicio', 'fecha_vencimiento','acciones'];
  dataSource;
  constructor() { }

  ngOnInit() {
  }

}
