import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ReparacionDetalle } from 'src/app/models/reparaciondetalles';
import { Parte } from 'src/app/models/parte';

export interface DetallesReparacion {
  parte_id : Parte;
  cantidad: number;
}

@Component({
  selector: 'app-reparacion-modal',
  templateUrl: './reparacion-modal.component.html',
  styleUrls: ['./reparacion-modal.component.css']
})

export class ReparacionModalComponent implements OnInit {

  detalle: DetallesReparacion;
  firstStep: FormGroup;
  secondStep: FormGroup;
  detallesList: any = [];
  usuarios: any = [];
  clientes: any = [];
  partes: any = [];
  displayedColumns : string[] = [
    'nombre_parte', 
    'cantidad',
    'acciones'
  ];
  detallesDS = new MatTableDataSource<DetallesReparacion>();
  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiLlanteraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReparacionModalComponent>
  ) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      usuario_id: ['', [Validators.required]],
      cliente_id: ['',[Validators.required]]
    });
    this.secondStep = this._formBuilder.group({
      parte_id: ['', [Validators.required]],
      cantidad: ['', [Validators.min(0), Validators.max(20)]]
    });
    this.loadUsers();
    this.loadClients();
    this.loadPartes();
  }

  loadUsers() {
    return this.api.getRows<User>('usuarios').subscribe(
      (data: {}) =>{
        this.usuarios = data;
      }
    );
  }

  loadClients() {
    return this.api.getRows<Client>('clientes').subscribe(
      (data: {}) =>{
        this.clientes = data;
        console.log(this.clientes);
      }
    );
  }

  loadPartes() {
    return this.api.getRows<Parte>('partes').subscribe(
      (data: {}) =>{
        this.partes = data;
      }
    );
  }

  insertReparacion(){
  }

  insertDetalles(){
    
  }

  agregarDetalle(){
    this.detalle = {
      parte_id : this.secondStep.controls['parte_id'].value,
      cantidad : this.secondStep.controls['cantidad'].value
    }
    this.detallesList.push(this.detalle);
    console.log(this.detallesList);
    this.detallesDS = this.detallesList;
  }

  deleteDetalle() {
    this.detallesList.pop();
    console.log(this.detallesList);
    this.detallesDS = this.detallesList;
  }



}
