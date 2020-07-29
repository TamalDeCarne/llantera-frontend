import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesUpdateComponent } from './partes-update.component';

describe('PartesUpdateComponent', () => {
  let component: PartesUpdateComponent;
  let fixture: ComponentFixture<PartesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
