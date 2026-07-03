import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyGenerator } from './api-key-generator';

describe('ApiKeyGenerator', () => {
  let component: ApiKeyGenerator;
  let fixture: ComponentFixture<ApiKeyGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiKeyGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
