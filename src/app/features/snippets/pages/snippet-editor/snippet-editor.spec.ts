import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetEditor } from './snippet-editor';

describe('SnippetEditor', () => {
  let component: SnippetEditor;
  let fixture: ComponentFixture<SnippetEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
