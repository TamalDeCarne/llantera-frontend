import { Component, OnInit } from '@angular/core';

export interface UserTypeComponent {
    denominacion_usuario: string;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserTypeComponent {

    denominacion_usuario: string;
  constructor() { }

}
