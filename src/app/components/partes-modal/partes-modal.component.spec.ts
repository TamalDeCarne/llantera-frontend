import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesModalComponent } from './partes-modal.component';

describe('PartesModalComponent', () => {
  let component: PartesModalComponent;
  let fixture: ComponentFixture<PartesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
