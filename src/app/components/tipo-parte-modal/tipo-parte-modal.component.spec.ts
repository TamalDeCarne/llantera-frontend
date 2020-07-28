import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoParteModalComponent } from './tipo-parte-modal.component';

describe('TipoParteModalComponent', () => {
  let component: TipoParteModalComponent;
  let fixture: ComponentFixture<TipoParteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoParteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoParteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
