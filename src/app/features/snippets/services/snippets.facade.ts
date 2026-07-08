import { Injectable, inject, signal, computed } from '@angular/core';
import {
  CreateSnippetUseCase,
  DeleteSnippetUseCase,
  GetByIdSnippetUseCase,
  GetSnippetUseCase,
  PutSnippetUseCase,
  SearchSnippetsUseCase,
} from '@core/application/use-cases/snippets';
import { SnippetDto, SnippetResultDto } from '@core/application/dto/snippet.dto';
import { UpdateSnippetRequest } from '@core/interfaces/tools.interface';
import { parseApiError } from '@core/interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root',
})
export class SnippetsFacade {
  private readonly createSnippetUseCase = inject(CreateSnippetUseCase);
  private readonly deleteSnippetUseCase = inject(DeleteSnippetUseCase);
  private readonly getByIdSnippetUseCase = inject(GetByIdSnippetUseCase);
  private readonly getAllSnippetsUseCase = inject(GetSnippetUseCase);
  private readonly putSnippetUseCase = inject(PutSnippetUseCase);
  private readonly searchSnippetUseCase = inject(SearchSnippetsUseCase);

  // ── Signals ──
  readonly snippets = signal<SnippetResultDto[]>([]);
  readonly activeSnippet = signal<SnippetResultDto | null>(null);
  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Acciones ──

  async loadAll(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const list = await this.getAllSnippetsUseCase.execute();
      this.snippets.set(list);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al cargar snippets'));
    }
  }

  async getById(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const snippet = await this.getByIdSnippetUseCase.getById(id);
      this.activeSnippet.set(snippet);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al buscar el snippet'));
    }
  }

  async create(dto: SnippetDto): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.createSnippetUseCase.create(dto);
      await this.loadAll();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al crear snippet'));
      throw err;
    }
  }

  async update(id: string, dto: UpdateSnippetRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const updated = await this.putSnippetUseCase.execute(id, dto);
      this.activeSnippet.set(updated);
      await this.loadAll();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al actualizar snippet'));
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.deleteSnippetUseCase.delete(id);
      if (this.activeSnippet()?.id === id) {
        this.activeSnippet.set(null);
      }
      await this.loadAll();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al eliminar snippet'));
      throw err;
    }
  }

  async search(query: string): Promise<void> {
    if (!query || !query.trim()) {
      return this.loadAll();
    }
    this.status.set('loading');
    this.error.set(null);
    try {
      const list = await this.searchSnippetUseCase.search(query);
      this.snippets.set(list);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error en la búsqueda'));
    }
  }
}

