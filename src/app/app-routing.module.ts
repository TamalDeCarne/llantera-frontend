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
import { ClientsComponent } from './components/clients/clients.component';
import { GarantiasComponent } from './components/garantias/garantias.component';
import { MotorComponent } from './components/motor/motor.component';
import { CarroceriaComponent } from './components/carroceria/carroceria.component';
import { PartesComponent } from './components/partes/partes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { StockComponent } from './components/stock/stock.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path:'stocks', component: StockComponent},
  {path: 'login', component: LogInComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'post', component: ShowPostsComponent },
  {path: 'new-post', component: NewPostComponent},
  {path: 'users', component: UsersComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'users/admin', component: AdminUserComponent},
  {path: 'users/employees', component: EmployeeUserComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'partes/motor', component: MotorComponent},
  {path: 'partes/carroceria', component: CarroceriaComponent},
  {path: 'partes', component: PartesComponent},
  {path: 'garantias', component: GarantiasComponent},
  {path: 'vehicles', component: VehiculosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
