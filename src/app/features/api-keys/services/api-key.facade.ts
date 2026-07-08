import { inject, Injectable, signal, computed } from '@angular/core';
import {
  CreateApiKeyUseCase,
  ListApiKeysUseCase,
  GetApiKeyStatsUseCase,
  RevokeApiKeyUseCase,
  DeleteApiKeyUseCase
} from '@core/application/use-cases/api-keys';
import {
  CreateApiKeyRequest,
  ApiKeyResponse,
  ApiKeyStatsResponse
} from '@core/interfaces/api-key.interface';
import { parseApiError } from '@core/interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyFacade {
  private readonly createUseCase = inject(CreateApiKeyUseCase);
  private readonly listUseCase = inject(ListApiKeysUseCase);
  private readonly statsUseCase = inject(GetApiKeyStatsUseCase);
  private readonly revokeUseCase = inject(RevokeApiKeyUseCase);
  private readonly deleteUseCase = inject(DeleteApiKeyUseCase);

  // ── Signals ──
  readonly apiKeys = signal<ApiKeyResponse[]>([]);
  readonly newlyCreatedKey = signal<ApiKeyResponse | null>(null); // Mostrar llave privada en modal una sola vez
  readonly selectedKeyStats = signal<ApiKeyStatsResponse | null>(null);

  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Acciones ──

  async loadApiKeys(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const response = await this.listUseCase.execute();
      // Omit<ApiKeyResponse, 'key'>[] se castea a ApiKeyResponse[] (la key estará vacía/omitida de la lista)
      this.apiKeys.set(response.items as ApiKeyResponse[]);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al listar las API Keys'));
    }
  }

  async generateApiKey(request: CreateApiKeyRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    this.newlyCreatedKey.set(null);
    try {
      const key = await this.createUseCase.execute(request);
      this.newlyCreatedKey.set(key);
      // Recargar lista después de crear
      await this.loadApiKeys();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al generar la API Key'));
      throw err;
    }
  }

  async revokeApiKey(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.revokeUseCase.execute(id);
      // Recargar lista tras revocar
      await this.loadApiKeys();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al revocar la API Key'));
      throw err;
    }
  }

  async deleteApiKey(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await this.deleteUseCase.execute(id);
      // Recargar lista tras eliminar
      await this.loadApiKeys();
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al eliminar la API Key'));
      throw err;
    }
  }

  async loadApiKeyStats(id: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    this.selectedKeyStats.set(null);
    try {
      const stats = await this.statsUseCase.execute(id);
      this.selectedKeyStats.set(stats);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al cargar estadísticas'));
    }
  }
}

