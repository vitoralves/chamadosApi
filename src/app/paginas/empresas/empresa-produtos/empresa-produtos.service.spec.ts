import { TestBed, inject } from '@angular/core/testing';

import { EmpresaProdutosService } from './empresa-produtos.service';

describe('EmpresaProdutosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaProdutosService]
    });
  });

  it('should ...', inject([EmpresaProdutosService], (service: EmpresaProdutosService) => {
    expect(service).toBeTruthy();
  }));
});
