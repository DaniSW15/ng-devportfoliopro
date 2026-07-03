import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPortal } from './billing-portal';

describe('BillingPortal', () => {
  let component: BillingPortal;
  let fixture: ComponentFixture<BillingPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingPortal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
