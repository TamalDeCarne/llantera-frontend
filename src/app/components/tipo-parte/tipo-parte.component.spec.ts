import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoParteComponent } from './tipo-parte.component';

describe('TipoParteComponent', () => {
  let component: TipoParteComponent;
  let fixture: ComponentFixture<TipoParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
