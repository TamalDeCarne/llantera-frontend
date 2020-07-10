import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './anuglar-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowPostsComponent } from './components/show-posts/show-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { ApipostService } from './services/apipost.service';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UsersComponent } from './components/users/users.component';
import { UserModalComponent, UserUpdateComponent } from './components/user-modal/user-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


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
    ConfirmDialogComponent
  ],
  entryComponents: [UserModalComponent, UserUpdateComponent, ConfirmDialogComponent],
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
  providers: [PostService, ApipostService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
