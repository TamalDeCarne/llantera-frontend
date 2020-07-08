import { Component, OnInit } from '@angular/core';

export interface EmployeeModalComponent {
    nombre: string;
    apellidos: string;
    direccion: string;
    email: string;
    fecha_contratacion: Date;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class EmployeeModalComponent {

    nombre: string;
    apellidos: string;
    direccion: string;
    email: string;
    fecha_contratacion: Date;

  constructor() { }


}
