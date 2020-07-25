import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowPostsComponent} from './components/show-posts/show-posts.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UsersComponent } from './components/users/users.component'
import { EmployeesComponent } from './components/employees/employees.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { EmployeeUserComponent } from './components/employee-user/employee-user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LogInComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'post', component: ShowPostsComponent },
  {path: 'new-post', component: NewPostComponent},
  {path: 'users', component: UsersComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'users/admin', component: AdminUserComponent},
  {path: 'users/employees', component: EmployeeUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
