import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtDecoder } from './jwt-decoder';

describe('JwtDecoder', () => {
  let component: JwtDecoder;
  let fixture: ComponentFixture<JwtDecoder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JwtDecoder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JwtDecoder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
