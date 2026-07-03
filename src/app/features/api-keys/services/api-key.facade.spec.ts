import { TestBed } from '@angular/core/testing';

import { ApiKeyFacade } from './api-key.facade';

describe('ApiKeyFacade', () => {
  let service: ApiKeyFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKeyFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
