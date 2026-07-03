import { TestBed } from '@angular/core/testing';

import { BillingFacade } from './billing.facade';

describe('BillingFacade', () => {
  let service: BillingFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
