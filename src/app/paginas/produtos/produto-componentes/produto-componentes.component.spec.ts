import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComponenteComponent } from './produto-componente.component';

describe('ProdutoComponenteComponent', () => {
  let component: ProdutoComponenteComponent;
  let fixture: ComponentFixture<ProdutoComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
