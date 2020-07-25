import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowPostsComponent } from './components/show-posts/show-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { ApiLlanteraService } from './services/api-llantera.service';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UsersComponent } from './components/users/users.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { EmployeeUserComponent } from './components/employee-user/employee-user.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    ShowPostsComponent,
    NewPostComponent,
    UsersComponent,
    UserModalComponent,
    UserUpdateComponent,
    ConfirmDialogComponent,
    EmployeesComponent,
    EmployeeModalComponent,
    EmployeeUpdateComponent,
    AdminUserComponent,
    EmployeeUserComponent
  ],
  entryComponents: [UserModalComponent, UserUpdateComponent, ConfirmDialogComponent, EmployeeUpdateComponent, EmployeeModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PostService, ApiLlanteraService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
