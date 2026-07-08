import { inject, Injectable, signal, computed } from '@angular/core';
import {
  GeneratePasswordUseCase,
  DecodeJwtUseCase,
  FormatJsonUseCase,
  GeneratePaletteUseCase,
  Base64UseCase,
  QrGeneratorUseCase,
  TimestampUseCase,
  UuidGeneratorUseCase
} from '@core/application/use-cases/tools';
import {
  PasswordGeneratorRequest,
  PasswordGeneratorResponse,
  JwtDecodeRequest,
  JwtDecodeResponse,
  JsonFormatterRequest,
  JsonFormatterResponse,
  ColorPaletteRequest,
  ColorPaletteResponse,
  Base64Request,
  Base64Response,
  QrGeneratorRequest,
  QrGeneratorResponse,
  TimestampCurrentResponse,
  TimestampToDateRequest,
  TimestampToDateResponse,
  DateToTimestampRequest,
  DateToTimestampResponse,
  UuidVersion,
  UuidSingleResponse,
  UuidBulkResponse
} from '@core/interfaces/tools.interface';
import { parseApiError } from '@core/interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ToolFacade {
  private readonly generatePasswordUseCase = inject(GeneratePasswordUseCase);
  private readonly decodeJwtUseCase = inject(DecodeJwtUseCase);
  private readonly formatJsonUseCase = inject(FormatJsonUseCase);
  private readonly generatePaletteUseCase = inject(GeneratePaletteUseCase);
  private readonly base64UseCase = inject(Base64UseCase);
  private readonly qrGeneratorUseCase = inject(QrGeneratorUseCase);
  private readonly timestampUseCase = inject(TimestampUseCase);
  private readonly uuidGeneratorUseCase = inject(UuidGeneratorUseCase);

  // ── Signals ──
  readonly passwordResult = signal<PasswordGeneratorResponse | null>(null);
  readonly jwtResult = signal<JwtDecodeResponse | null>(null);
  readonly jsonResult = signal<JsonFormatterResponse | null>(null);
  readonly paletteResult = signal<ColorPaletteResponse | null>(null);
  readonly base64Result = signal<Base64Response | null>(null);
  readonly qrResult = signal<QrGeneratorResponse | null>(null);
  readonly timestampResult = signal<TimestampToDateResponse | DateToTimestampResponse | TimestampCurrentResponse | null>(null);
  readonly uuidResult = signal<UuidSingleResponse | UuidBulkResponse | null>(null);

  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── State Management ──
  clearState(): void {
    this.status.set('idle');
    this.error.set(null);
    this.passwordResult.set(null);
    this.jwtResult.set(null);
    this.jsonResult.set(null);
    this.paletteResult.set(null);
    this.base64Result.set(null);
    this.qrResult.set(null);
    this.timestampResult.set(null);
    this.uuidResult.set(null);
  }

  // ── Error Handling Centralizado ──
  /**
   * Ejecuta una operación asíncrona con manejo de estado y errores uniforme.
   * Elimina la repetición de try/catch/status en cada acción.
   */
  private async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    onSuccess: (result: T) => void,
    fallbackMessage: string
  ): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const result = await operation();
      onSuccess(result);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, fallbackMessage));
      throw err;
    }
  }

  // ── Acciones ──

  generatePassword(request: PasswordGeneratorRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.generatePasswordUseCase.execute(request),
      (res) => this.passwordResult.set(res),
      'Error al generar la contraseña'
    );
  }

  decodeJwt(request: JwtDecodeRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.decodeJwtUseCase.execute(request),
      (res) => this.jwtResult.set(res),
      'Error al decodificar el token JWT'
    );
  }

  formatJson(request: JsonFormatterRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.formatJsonUseCase.execute(request),
      (res) => this.jsonResult.set(res),
      'Error al formatear JSON'
    );
  }

  generatePalette(request: ColorPaletteRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.generatePaletteUseCase.execute(request),
      (res) => this.paletteResult.set(res),
      'Error al generar la paleta de colores'
    );
  }

  encodeDecodeBase64(request: Base64Request): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.base64UseCase.execute(request),
      (res) => this.base64Result.set(res),
      'Error al procesar Base64'
    );
  }

  generateQr(request: QrGeneratorRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.qrGeneratorUseCase.execute(request),
      (res) => this.qrResult.set(res),
      'Error al generar código QR'
    );
  }

  fetchCurrentTimestamp(): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.timestampUseCase.getCurrent(),
      (res) => this.timestampResult.set(res),
      'Error al cargar timestamp actual'
    );
  }

  convertTimestampToDate(request: TimestampToDateRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.timestampUseCase.toDate(request),
      (res) => this.timestampResult.set(res),
      'Error al convertir timestamp a fecha'
    );
  }

  convertDateToTimestamp(request: DateToTimestampRequest): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.timestampUseCase.toTimestamp(request),
      (res) => this.timestampResult.set(res),
      'Error al convertir fecha a timestamp'
    );
  }

  generateUuid(version: UuidVersion): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.uuidGeneratorUseCase.generate(version),
      (res) => this.uuidResult.set(res),
      'Error al generar UUID'
    );
  }

  generateUuidBulk(count: number, version: UuidVersion): Promise<void> {
    return this.executeWithErrorHandling(
      () => this.uuidGeneratorUseCase.generateBulk(count, version),
      (res) => this.uuidResult.set(res),
      'Error al generar UUIDs múltiples'
    );
  }
}

