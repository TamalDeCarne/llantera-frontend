import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {

  isLinear = true;
  firstStep: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private apiService: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientModalComponent>
  ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  insertClient() {
    if (this.firstStep.valid) {
      this.apiService.insertRow<Client>(this.firstStep.value, 'cliente').subscribe(
        (data: {}) => {
          this.dialogRef.close(true);
        }
      );
    }
  }

}
