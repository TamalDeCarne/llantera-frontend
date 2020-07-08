import { TestBed } from '@angular/core/testing';

import { ApipostService } from './apipost.service';

describe('ApipostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApipostService = TestBed.get(ApipostService);
    expect(service).toBeTruthy();
  });
});
