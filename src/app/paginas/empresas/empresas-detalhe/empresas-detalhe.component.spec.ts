import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasDetalheComponent } from './empresas-detalhe.component';

describe('EmpresasDetalheComponent', () => {
  let component: EmpresasDetalheComponent;
  let fixture: ComponentFixture<EmpresasDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
