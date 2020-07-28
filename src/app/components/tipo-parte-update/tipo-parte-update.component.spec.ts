import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoParteUpdateComponent } from './tipo-parte-update.component';

describe('TipoParteUpdateComponent', () => {
  let component: TipoParteUpdateComponent;
  let fixture: ComponentFixture<TipoParteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoParteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoParteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
