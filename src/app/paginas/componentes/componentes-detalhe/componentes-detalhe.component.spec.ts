import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesDetalheComponent } from './componentes-detalhe.component';

describe('ComponentesDetalheComponent', () => {
  let component: ComponentesDetalheComponent;
  let fixture: ComponentFixture<ComponentesDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentesDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
