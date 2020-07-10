import { Component, OnInit } from '@angular/core';
import { ApipostService } from '../../services/apipost.service';
import { UserModalComponent, UserUpdateComponent } from '../user-modal/user-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any = [];
  constructor(private usersService:ApipostService, 
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    return this.usersService.getUsers().subscribe(
      (data: {}) =>{
        this.userList = data;
      }
    );
  }

  openModal() {
    const dialogRef1 = this.dialog.open(UserModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if(dialogRef){
        this.loadUsers();
      }
    });

  }
//TODO correcto
  deleteUser(user){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar un usuario',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        return this.usersService.deleteUsuario(user.id).subscribe((data: {}) => {
        this.deleteEmployee(user.empleado.id);
        this.loadUsers(); 
        });
      }
    })
  }

  deleteEmployee(id){
    return this.usersService.deleteEmpleado(id).subscribe((data: {}) => { console.log(data); });
  }

  updateModal(user){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Estas a punto de actualizar un usuario',
          message: '¿Estas seguro?'
        }
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          const dialogconfig = new MatDialogConfig();
          dialogconfig.data = {
            userId: user.id,
            employeeId: user.empleado.id
          };
          const updatedialog = this.dialog.open(UserUpdateComponent, dialogconfig);
          updatedialog.afterClosed().subscribe(dialogRef => {
            if(dialogRef){
              this.loadUsers();
            }
          });
        }
      });
  }

}
