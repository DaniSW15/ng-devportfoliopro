import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { ErrorNotificationService } from '@core/infrastructure/services/error-notification';
import { throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';

const ERROR_TIMEOUT_MS = 15000; // 15 segundos antes de timeout

// ────────────────────────────────────────────────────────────────
// Helper: Mapeo semántico de códigos HTTP
// ────────────────────────────────────────────────────────────────
interface HttpErrorMeta {
  severity: 'info' | 'warning' | 'error';
  summary: string;
  defaultDetail: string;
  life: number;
}

const HTTP_ERROR_MAP: Record<number, HttpErrorMeta> = {
  400: { severity: 'warning', summary: 'Datos Inválidos',       defaultDetail: 'La solicitud contiene datos incorrectos.',    life: 6000 },
  401: { severity: 'warning', summary: 'Sesión Expirada',       defaultDetail: 'Tu sesión ha expirado. Inicia sesión nuevamente.', life: 5000 },
  403: { severity: 'error',   summary: 'Acceso Denegado',       defaultDetail: 'No tienes permisos para esta acción.',         life: 5000 },
  404: { severity: 'warning', summary: 'No Encontrado',         defaultDetail: 'El recurso que buscas no existe.',             life: 4000 },
  409: { severity: 'warning', summary: 'Conflicto',             defaultDetail: 'El recurso ya existe o hay un conflicto.',     life: 5000 },
  422: { severity: 'warning', summary: 'Entidad No Procesable', defaultDetail: 'No se pudo procesar la solicitud.',            life: 5000 },
  429: { severity: 'warning', summary: 'Demasiadas Solicitudes', defaultDetail: 'Has excedido el límite de solicitudes. Espera un momento.', life: 7000 },
};

// ────────────────────────────────────────────────────────────────
// Helper público: Extrae un mensaje legible de cualquier error
// ────────────────────────────────────────────────────────────────
/**
 * Parsea un error HTTP (especialmente los DTOs de NestJS con `message: string[]`)
 * y devuelve un string legible para el usuario.
 *
 * Uso en fachadas:
 * ```ts
 * catch (err: any) {
 *   this.error.set(parseApiError(err, 'Error al generar la contraseña'));
 * }
 * ```
 */
export function parseApiError(error: unknown, fallback: string = 'Ocurrió un error inesperado.'): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error;

    // NestJS validation pipe: { message: string[] | string, statusCode: number }
    if (body?.message) {
      if (Array.isArray(body.message)) {
        return body.message.map((m: string) => `• ${m}`).join('\n');
      }
      if (typeof body.message === 'string') {
        return body.message;
      }
    }

    // Algunos backends devuelven { error: "descripción" }
    if (typeof body?.error === 'string' && body.error !== 'Bad Request') {
      return body.error;
    }

    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
}

// ────────────────────────────────────────────────────────────────
// Interceptor global de manejo de errores
// ────────────────────────────────────────────────────────────────
/**
 * Interceptor funcional que:
 * 1. Aplica un timeout global de 15 s.
 * 2. Parsea inteligentemente errores de validación DTO de NestJS.
 * 3. Muestra notificaciones amigables al usuario según el código HTTP.
 * 4. Re-lanza el error para que las fachadas puedan reaccionar.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);

  return next(req).pipe(
    timeout(ERROR_TIMEOUT_MS),
    catchError((error) => {
      const errorService = injector.get(ErrorNotificationService);

      // 1. Sin conexión o error de red (status === 0)
      if (error.status === 0) {
        errorService.showNetworkError(0, 'No hay conexión a internet');
        return throwError(() => error);
      }

      // 2. Timeout
      if (error.name === 'TimeoutError') {
        errorService.showTimeoutError();
        return throwError(() => error);
      }

      // 3. Errores HTTP
      if (error instanceof HttpErrorResponse) {
        const status = error.status;
        const detail = parseApiError(error, '');
        const meta = HTTP_ERROR_MAP[status];

        if (meta) {
          errorService.showError({
            severity: meta.severity,
            summary: meta.summary,
            detail: detail || meta.defaultDetail,
            life: meta.life,
          });
        } else if (status >= 500) {
          errorService.showError({
            severity: 'error',
            summary: 'Error del Servidor',
            detail: detail || 'Algo salió mal en el servidor. Intenta más tarde.',
            life: 5000,
          });
        } else {
          errorService.showNetworkError(status, detail || undefined);
        }

        return throwError(() => error);
      }

      // 4. Error desconocido
      errorService.showError({
        severity: 'error',
        summary: 'Error Desconocido',
        detail: parseApiError(error),
        life: 5000,
      });

      return throwError(() => error);
    })
  );
};