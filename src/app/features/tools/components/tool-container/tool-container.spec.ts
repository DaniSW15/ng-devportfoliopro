import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolContainer } from './tool-container';

describe('ToolContainer', () => {
  let component: ToolContainer;
  let fixture: ComponentFixture<ToolContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
