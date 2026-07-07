import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SnippetsFacade } from '../../services/snippets.facade';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-snippet-editor',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CheckboxModule,
    MessageModule,
  ],
  templateUrl: './snippet-editor.html',
  styleUrl: './snippet-editor.scss',
})
export class SnippetEditor implements OnInit {
  protected readonly facade = inject(SnippetsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Campos del formulario
  readonly title = signal<string>('');
  readonly content = signal<string>('');
  readonly description = signal<string>('');
  readonly language = signal<string>('javascript');
  readonly isPublic = signal<boolean>(false);
  readonly tagsInput = signal<string>('');

  // Identificador en caso de edición
  readonly snippetId = signal<string | null>(null);

  constructor() {
    // Rellenar formulario cuando se carguen los datos al editar
    effect(() => {
      const current = this.facade.activeSnippet();
      if (this.snippetId() && current && current.id === this.snippetId()) {
        this.title.set(current.title);
        this.content.set(current.content);
        this.description.set(current.description || '');
        this.language.set(current.language);
        this.isPublic.set(current.isPublic);
        this.tagsInput.set(current.tags ? current.tags.join(', ') : '');
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.snippetId.set(id);
      this.facade.getById(id);
    } else {
      this.snippetId.set(null);
      this.facade.activeSnippet.set(null);
      this.title.set('');
      this.content.set('');
      this.description.set('');
      this.language.set('javascript');
      this.isPublic.set(false);
      this.tagsInput.set('');
    }
  }

  get isEditMode(): boolean {
    return this.snippetId() !== null;
  }

  async onSubmit(): Promise<void> {
    if (!this.title().trim() || !this.content().trim() || !this.language().trim()) {
      return;
    }

    const tags = this.tagsInput()
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: this.title().trim(),
      content: this.content().trim(),
      description: this.description().trim(),
      language: this.language().trim(),
      isPublic: this.isPublic(),
      tags,
    };

    try {
      if (this.isEditMode) {
        await this.facade.update(this.snippetId()!, payload);
      } else {
        await this.facade.create(payload);
      }
      this.router.navigate(['/snippets']);
    } catch (err) {
      console.error('Error al guardar el snippet', err);
    }
  }
}
