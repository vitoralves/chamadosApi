import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaProdutosComponent } from './empresa-produtos.component';

describe('EmpresaProdutosComponent', () => {
  let component: EmpresaProdutosComponent;
  let fixture: ComponentFixture<EmpresaProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
