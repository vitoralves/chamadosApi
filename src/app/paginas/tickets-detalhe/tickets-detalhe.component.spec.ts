import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDetalheComponent } from './tickets-detalhe.component';

describe('TicketsDetalheComponent', () => {
  let component: TicketsDetalheComponent;
  let fixture: ComponentFixture<TicketsDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
