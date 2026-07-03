import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  let component: ErrorBoundary;
  let fixture: ComponentFixture<ErrorBoundary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBoundary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorBoundary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
