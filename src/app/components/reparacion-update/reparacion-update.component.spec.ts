import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionUpdateComponent } from './reparacion-update.component';

describe('ReparacionUpdateComponent', () => {
  let component: ReparacionUpdateComponent;
  let fixture: ComponentFixture<ReparacionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
