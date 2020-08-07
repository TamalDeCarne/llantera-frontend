import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersComponent } from '../users/users.component';

export interface Empleado {
  nombre_usuario : string;
  nombre : string;
  apellidos : string;
  email : string;
}

@Component({
  selector: 'app-view-employee-modal',
  templateUrl: './view-employee-modal.component.html',
  styleUrls: ['./view-employee-modal.component.css']
})
export class ViewEmployeeModalComponent implements OnInit {

  
  
  constructor(
    public dialog: MatDialog,
    public dialogRef : MatDialogRef<UsersComponent>, @Inject(MAT_DIALOG_DATA) public data : Empleado
  ) {
   }

  ngOnInit() {
  }

}
