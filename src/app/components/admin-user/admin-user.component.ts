import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatTableDataSource, MatDialog } from '@angular/material';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  userList: any = [];
  displayedColumns : string[] = ['nombre_usuario', 'nombre', 'apellidos', 'email', 'direccion', 'fecha_contratacion', 'acciones'];
  dataSource;
  constructor(private usersService: ApiLlanteraService,
    public dialog: MatDialog) { }

    ngOnInit() {
      this.loadUsers();
  }

  loadUsers() {
    return this.usersService.getRows<User>('usuarios').subscribe(
      (data: {}) =>{

          this.userList = data;
        this.userList = this.userList.filter((user) => user.tipo_usuario.id === 2);
        this.dataSource = new MatTableDataSource<User>(this.userList);
      }
    );
  }

  deleteUser(user){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar un usuario',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        return this.usersService.deleteRow<User>(user.id,'usuario').subscribe((data: {}) => {
        this.deleteEmployee(user.empleado.id);
        this.loadUsers();
        });
      }
    })
  }

  deleteEmployee(id){
    return this.usersService.deleteRow<Employee>(id, 'empleado').subscribe((data: {}) => { console.log(data); });
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
