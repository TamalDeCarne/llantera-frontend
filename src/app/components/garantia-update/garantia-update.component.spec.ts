import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiaUpdateComponent } from './garantia-update.component';

describe('GarantiaUpdateComponent', () => {
  let component: GarantiaUpdateComponent;
  let fixture: ComponentFixture<GarantiaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarantiaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
