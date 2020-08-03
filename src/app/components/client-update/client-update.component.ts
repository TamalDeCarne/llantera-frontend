import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ClientUpdateComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.clientId = data.clientId;
  }


  clientId: number;
  clientData: Client;

  isLinear = true;
  firstStep: FormGroup;


  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
    });
    this.getClient();
  }

  getClient() {
    return this.apiService.getRow<Client>(this.clientId, 'cliente').subscribe(
      (data) => {

        this.clientData = data;
        this.firstStep.patchValue({
          nombre: this.clientData.nombre,
          apellidos: this.clientData.apellidos,
          email: this.clientData.email,
          telefono: this.clientData.telefono
        });
      })
  }

  updateClient() {
    return this.apiService.updateRow<Client>(this.clientId, this.firstStep.value, 'cliente').subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      });
  }
}
