import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionDetallesComponent } from './reparacion-detalles.component';

describe('ReparacionDetallesComponent', () => {
  let component: ReparacionDetallesComponent;
  let fixture: ComponentFixture<ReparacionDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
