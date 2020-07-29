import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroceriaComponent } from './carroceria.component';

describe('CarroceriaComponent', () => {
  let component: CarroceriaComponent;
  let fixture: ComponentFixture<CarroceriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarroceriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarroceriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
