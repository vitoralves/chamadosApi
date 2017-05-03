import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasNovoComponent } from './empresas-novo.component';

describe('EmpresasNovoComponent', () => {
  let component: EmpresasNovoComponent;
  let fixture: ComponentFixture<EmpresasNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
