import { Component, OnInit } from '@angular/core';
import { ApipostService } from '../../services/apipost.service';
import { UserModalComponent, UserUpdateComponent } from '../user-modal/user-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any = [];
  constructor(private usersService:ApipostService, public dialog: MatDialog, private updateUser: UserUpdateComponent) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    return this.usersService.getUsers().subscribe(
      (data: {}) =>{
        this.userList = data;
        console.log(this.userList);
      }
    );
  }

  openModal() {
    this.dialog.open(UserModalComponent);
  }

  deleteUser(user){
    return this.usersService.deleteUsuario(user.id).subscribe((data: {}) => {
      this.deleteEmployee(user.empleado.id);
      console.log(data); 
    });
  }

  deleteEmployee(id){
    return this.usersService.deleteEmpleado(id).subscribe((data: {}) => { console.log(data); });
  }

  updateModal(user){
    this.updateUser.getUser(user.id);
    this.dialog.open(UserUpdateComponent);
  }

}
