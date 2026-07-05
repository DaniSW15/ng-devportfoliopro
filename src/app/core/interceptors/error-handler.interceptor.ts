import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { ErrorNotificationService } from '@core/infrastructure/services/error-notification';
import { throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';

const ERROR_TIMEOUT_MS = 15000; // 15 segundos antes de timeout

/**
 * Interceptor global de manejo de errores.
 * 
 * ✅ Usa runInInjectionContext para evitar circular dependency
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const injector = inject(Injector);

    return next(req).pipe(
        timeout(ERROR_TIMEOUT_MS),
        catchError((error) => {
            // ✅ Inyectar el servicio SOLO cuando hay error (defer until needed)
            const errorService = injector.get(ErrorNotificationService);
            
            // 1. Sin conexión o error de red (status === 0)
            if (error.status === 0) {
                errorService.showNetworkError(0, 'No hay conexión a internet');
            }
            // 2. Timeout
            else if (error.name === 'TimeoutError') {
                errorService.showTimeoutError();
            }
            // 3. Errores HTTP normales (400, 401, 403, 500, etc.)
            else if (error instanceof HttpErrorResponse) {
                const status = error.status;
                const message = error.error?.message || error.message;

                if (status === 401) {
                    errorService.showError({
                        severity: 'warning',
                        summary: 'Sesión Expirada',
                        detail: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
                        life: 5000,
                    });
                } else if (status === 403) {
                    errorService.showError({
                        severity: 'error',
                        summary: 'Acceso Denegado',
                        detail: 'No tienes permisos para esta acción.',
                        life: 5000,
                    });
                } else if (status === 404) {
                    errorService.showError({
                        severity: 'warning',
                        summary: 'No Encontrado',
                        detail: 'El recurso que buscas no existe.',
                        life: 4000,
                    });
                } else if (status >= 500) {
                    errorService.showError({
                        severity: 'error',
                        summary: 'Error del Servidor',
                        detail: message || 'Algo salió mal. Intenta más tarde.',
                        life: 5000,
                    });
                } else {
                    errorService.showNetworkError(status, message);
                }
            } else {
                // Error desconocido
                errorService.showError({
                    severity: 'error',
                    summary: 'Error Desconocido',
                    detail: error?.message || 'Ocurrió un error inesperado.',
                    life: 5000,
                });
            }

            return throwError(() => error);
        })
    );
};