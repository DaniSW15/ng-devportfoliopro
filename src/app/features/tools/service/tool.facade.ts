import { inject, Injectable, signal, computed } from '@angular/core';
import { GeneratePasswordUseCase, DecodeJwtUseCase, FormatJsonUseCase } from '@core/application/use-cases/tools';
import {
  PasswordGeneratorRequest,
  PasswordGeneratorResponse,
  JwtDecodeRequest,
  JwtDecodeResponse,
  JsonFormatterRequest,
  JsonFormatterResponse
} from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class ToolFacade {
  private readonly generatePasswordUseCase = inject(GeneratePasswordUseCase);
  private readonly decodeJwtUseCase = inject(DecodeJwtUseCase);
  private readonly formatJsonUseCase = inject(FormatJsonUseCase);

  // ── Signals ──
  readonly passwordResult = signal<PasswordGeneratorResponse | null>(null);
  readonly jwtResult = signal<JwtDecodeResponse | null>(null);
  readonly jsonResult = signal<JsonFormatterResponse | null>(null);

  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Acciones ──

  async generatePassword(request: PasswordGeneratorRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.generatePasswordUseCase.execute(request);
      this.passwordResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al generar la contraseña');
      throw err;
    }
  }

  async decodeJwt(request: JwtDecodeRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.decodeJwtUseCase.execute(request);
      this.jwtResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al decodificar el token JWT');
      throw err;
    }
  }

  async formatJson(request: JsonFormatterRequest): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const res = await this.formatJsonUseCase.execute(request);
      this.jsonResult.set(res);
      this.status.set('idle');
    } catch (err: any) {
      this.status.set('error');
      this.error.set(err.message || 'Error al formatear JSON');
      throw err;
    }
  }
}
