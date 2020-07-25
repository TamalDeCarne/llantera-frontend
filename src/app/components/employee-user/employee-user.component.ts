import { Component, OnInit } from '@angular/core';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { MatDialogConfig, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';

@Component({
  selector: 'app-employee-user',
  templateUrl: './employee-user.component.html',
  styleUrls: ['./employee-user.component.css']
})

export class EmployeeUserComponent implements OnInit {
  userList: any = [];
  displayedColumns : string[] = ['nombre_usuario', 'nombre', 'apellidos', 'email', 'direccion', 'fecha_contratacion', 'acciones'];
  dataSource;
  constructor(private usersService: ApiLlanteraService,
    public dialog: MatDialog) { }
  
    ngOnInit() {
      this.loadUsers();
  }

  loadUsers() {
    return this.usersService.getUsers().subscribe(
      (data: {}) =>{
        
          this.userList = data;
        this.userList = this.userList.filter((user) => user.tipo_usuario.id === 1);
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
