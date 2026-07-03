import { TestBed } from '@angular/core/testing';

import { ToolFacade } from './tool.facade';

describe('ToolFacade', () => {
  let service: ToolFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
