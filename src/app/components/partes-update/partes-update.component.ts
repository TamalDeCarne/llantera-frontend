import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { Parte } from 'src/app/models/parte';
import { TipoParte } from 'src/app/models/tipoparte';

@Component({
  selector: 'app-partes-update',
  templateUrl: './partes-update.component.html',
  styleUrls: ['./partes-update.component.css']
})
export class PartesUpdateComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PartesUpdateComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.parteId = data.parteId;
   }
   parte: any = [];
   tiposParte: any = [];
   secondStep: FormGroup;
   parteId: number;
  ngOnInit() {
    this.secondStep = this._formBuilder.group({
      nombre_parte: ['',[Validators.required]],
      descripcion_parte: ['',[Validators.required]],
      tipo_parte_id: ['',[Validators.required]],
      precio: ['',[Validators.required]]
    });
    this.getParte();
    this.loadTiposParte();
  }

  getParte() {
    return this.api.getRow<Parte>(this.parteId, 'parte').subscribe(
      (data) => {
        this.parte = data;
        this.secondStep.patchValue({
          nombre_parte: this.parte.nombre_parte,
          descripcion_parte: this.parte.descripcion_parte,
          tipo_parte_id: this.parte.tipo_parte.id,
          precio: this.parte.precio
        });
      }
    )
  }

  loadTiposParte(){
    return this.api.getRows<TipoParte>('tiposParte').subscribe(
      (data: {}) =>{
        this.tiposParte = data;
      }
    )
  }

  updateParte(){
    return this.api.updateRow<Parte>(this.parteId, this.secondStep.value, 'parte').subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      }
    );
  }

}
