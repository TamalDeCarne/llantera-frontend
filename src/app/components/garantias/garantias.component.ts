import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Garantia } from 'src/app/models/garantia';


@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {

  garantias: any = [];
  displayedColumns: string[] = ['fecha_inicio', 'fecha_vencimiento'];
  dataSource;
  constructor(private api: ApiLlanteraService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadGarantias();
  }

  loadGarantias() {
    return this.api.getRows<Garantia>('garantias').subscribe(
      (data: {}) => {
        this.garantias = data;
        this.dataSource = new MatTableDataSource<Garantia>(this.garantias);
      }
    );
  }

  deleteGarantia(id) {
    return this.api.deleteRow<Garantia>(id, 'garantia').subscribe((data: {}) => { console.log(data); });
  }

}
