import { TestBed } from '@angular/core/testing';

import { SnippetsFacadeTs } from './snippets.facade.js';

describe('SnippetsFacadeTs', () => {
  let service: SnippetsFacadeTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnippetsFacadeTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
