import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyList } from './api-key-list';

describe('ApiKeyList', () => {
  let component: ApiKeyList;
  let fixture: ComponentFixture<ApiKeyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiKeyList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
