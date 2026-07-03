import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampConverter } from './timestamp-converter';

describe('TimestampConverter', () => {
  let component: TimestampConverter;
  let fixture: ComponentFixture<TimestampConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimestampConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimestampConverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
