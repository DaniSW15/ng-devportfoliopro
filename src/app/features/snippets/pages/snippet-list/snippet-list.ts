import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SnippetsFacade } from '../../services/snippets.facade';
import { SnippetCard } from '../../components/snippet-card/snippet-card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Search } from '@primeicons/angular/search';
import { Spinner } from '@primeicons/angular/spinner';

@Component({
  selector: 'app-snippet-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SnippetCard,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MessageModule,
    Search,
    Spinner,
  ],
  templateUrl: './snippet-list.html',
  styleUrl: './snippet-list.scss',
})
export class SnippetList implements OnInit {
  protected readonly facade = inject(SnippetsFacade);

  readonly searchQuery = signal<string>('');
  private searchTimeout: any;

  ngOnInit(): void {
    this.facade.loadAll();
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.facade.search(value);
    }, 300); // 300ms debounce
  }

  async onDeleteSnippet(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar este snippet permanentemente?')) {
      try {
        await this.facade.remove(id);
      } catch (err) {
        console.error('Error al borrar el snippet', err);
      }
    }
  }
}
