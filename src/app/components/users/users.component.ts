import { Component, OnInit } from '@angular/core';
import { ApipostService } from '../../services/apipost.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any = [];
  constructor(private usersService:ApipostService) { }

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

}
