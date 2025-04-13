import { TestBed } from '@angular/core/testing';

import { ProductosGruposService } from './productos-grupos.service';

describe('ProductosGruposService', () => {
  let service: ProductosGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
