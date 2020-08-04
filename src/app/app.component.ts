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


  getProperties() {
    if(this.width < 900){
      this.mode = new FormControl('push');
      this.opened = false;
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

  getSidenav(side){
    if(this.width){
      this.sidenav = side;
      return true;
    }
  }
}
