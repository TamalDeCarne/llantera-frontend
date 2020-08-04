import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionModalComponent } from './reparacion-modal.component';

describe('ReparacionModalComponent', () => {
  let component: ReparacionModalComponent;
  let fixture: ComponentFixture<ReparacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
