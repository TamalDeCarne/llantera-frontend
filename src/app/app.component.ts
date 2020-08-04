import { Component, Directive, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  fixed: boolean = false;

  mode = new FormControl('side');
  private sidenav : MatSidenav;
  opened : boolean = true;

  getSidenav(side){
    this.sidenav = side;
  }

  getProperties() {
    if(this.width < 900){
      this.mode = new FormControl('push');
      this.opened = false;
      console.log("entre pero no hice nada");
    }
    else {
      this.mode = new FormControl('side');
      this.opened = true;
    }
  }
  
  width: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.width = event.target.innerWidth;
    this.getProperties();
  }

  isWidth(side){
    if(this.width){
      this.getSidenav(side);
      return true;
    }
  }
}
