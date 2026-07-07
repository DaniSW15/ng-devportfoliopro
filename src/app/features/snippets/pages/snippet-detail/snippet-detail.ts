import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SnippetsFacade } from '../../services/snippets.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-snippet-detail',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './snippet-detail.html',
  styleUrl: './snippet-detail.scss',
})
export class SnippetDetail implements OnInit, OnDestroy {
  protected readonly facade = inject(SnippetsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly copied = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facade.getById(id);
    }
  }

  ngOnDestroy(): void {
    this.facade.activeSnippet.set(null);
  }

  async copyCode(content: string): Promise<void> {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar el código', err);
    }
  }

  async onDelete(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar este snippet permanentemente?')) {
      try {
        await this.facade.remove(id);
        this.router.navigate(['/snippets']);
      } catch (err) {
        console.error('Error al eliminar el snippet', err);
      }
    }
  }
}
