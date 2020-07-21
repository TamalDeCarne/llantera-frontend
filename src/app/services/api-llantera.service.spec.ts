import { TestBed } from '@angular/core/testing';

import { ApiLlanteraService } from './api-llantera.service';

describe('ApipostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLlanteraService = TestBed.get(ApiLlanteraService);
    expect(service).toBeTruthy();
  });
});
