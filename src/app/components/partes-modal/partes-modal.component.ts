import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TipoParte } from 'src/app/models/tipoparte';
import { Parte } from 'src/app/models/parte';

@Component({
  selector: 'app-partes-modal',
  templateUrl: './partes-modal.component.html',
  styleUrls: ['./partes-modal.component.css']
})
export class PartesModalComponent implements OnInit {

  isLinear: true;
  secondStep: FormGroup;
  tiposParte: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PartesModalComponent>
  ) { }

  ngOnInit() {
    this.secondStep = this._formBuilder.group({
      nombre_parte: ['',[Validators.required]],
      descripcion_parte: ['',[Validators.required]],
      tipo_parte_id: ['',[Validators.required]],
      precio: ['',[Validators.required]]
    });
    this.loadTiposParte();
  }

  loadTiposParte(){
    return this.api.getRows<TipoParte>('tiposParte').subscribe(
      (data: {}) =>{
        this.tiposParte = data;
      }
    )
  }

  insertParte(){
    if(this.secondStep.valid){
      this.api.insertRow<Parte>(this.secondStep.value,'parte').subscribe(
        (data: {}) => {
          this.dialogRef.close(true);
        }
      )
    }
  }

}
