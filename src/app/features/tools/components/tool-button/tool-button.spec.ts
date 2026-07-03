import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolButton } from './tool-button';

describe('ToolButton', () => {
  let component: ToolButton;
  let fixture: ComponentFixture<ToolButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
