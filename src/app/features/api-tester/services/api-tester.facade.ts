import { Injectable, inject, signal, computed } from '@angular/core';
import {
  ExecuteRequestUseCase,
  SaveRequestUseCase,
  GetHistoryUseCase,
  DeleteHistoryUseCase,
  ClearHistoryUseCase,
  CreateCollectionUseCase,
  GetCollectionsUseCase,
} from '@core/application/use-cases/api-tester';
import {
  ApiTesterRequest,
  ApiTesterResponse,
  SaveRequestPayload,
  CollectionPayload,
} from '@core/interfaces/tools.interface';
import { parseApiError } from '@core/interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ApiTesterFacade {
  private readonly executeRequestUseCase = inject(ExecuteRequestUseCase);
  private readonly saveRequestUseCase = inject(SaveRequestUseCase);
  private readonly getHistoryUseCase = inject(GetHistoryUseCase);
  private readonly deleteHistoryUseCase = inject(DeleteHistoryUseCase);
  private readonly clearHistoryUseCase = inject(ClearHistoryUseCase);
  private readonly createCollectionUseCase = inject(CreateCollectionUseCase);
  private readonly getCollectionsUseCase = inject(GetCollectionsUseCase);

  // ── Signals ──
  readonly history = signal<SaveRequestPayload[]>([]);
  readonly collections = signal<CollectionPayload[]>([]);
  readonly activeResponse = signal<ApiTesterResponse | null>(null);
  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Actions ──

  async execute(request: ApiTesterRequest): Promise<ApiTesterResponse> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const response = await this.executeRequestUseCase.execute(request);
      this.activeResponse.set(response);
      this.status.set('idle');
      return response;
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al ejecutar la petición'));
      throw err;
    }
  }

  async loadHistory(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const list = await this.getHistoryUseCase.execute();
      this.history.set(list);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al cargar el historial'));
    }
  }

  async save(payload: SaveRequestPayload): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.saveRequestUseCase.execute(payload);
      await this.loadHistory();
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al guardar la petición'));
      throw err;
    }
  }

  async deleteHistoryItem(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.deleteHistoryUseCase.execute(id);
      await this.loadHistory();
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al borrar el elemento del historial'));
    }
  }

  async clearAllHistory(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.clearHistoryUseCase.execute();
      this.history.set([]);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al limpiar el historial'));
    }
  }

  async loadCollections(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const list = await this.getCollectionsUseCase.execute();
      this.collections.set(list);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al cargar colecciones'));
    }
  }

  async createNewCollection(name: string, description?: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.createCollectionUseCase.execute({
        name,
        description,
        requests: []
      });
      await this.loadCollections();
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al crear la colección'));
    }
  }
}

