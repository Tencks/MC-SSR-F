import { TestBed } from '@angular/core/testing';

import { ProductosSubGruposService } from './productos-sub-grupos.service';

describe('ProductosSubGruposService', () => {
  let service: ProductosSubGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosSubGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
