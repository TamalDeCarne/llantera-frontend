import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosUpdateComponent } from './vehiculos-update.component';

describe('VehiculosUpdateComponent', () => {
  let component: VehiculosUpdateComponent;
  let fixture: ComponentFixture<VehiculosUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
