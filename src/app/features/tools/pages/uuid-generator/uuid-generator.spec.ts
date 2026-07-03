import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UuidGenerator } from './uuid-generator';

describe('UuidGenerator', () => {
  let component: UuidGenerator;
  let fixture: ComponentFixture<UuidGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UuidGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UuidGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
