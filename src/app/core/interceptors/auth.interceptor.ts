import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHttpAdapter } from '@core/infrastructure/adapters/http/auth.http-adapter';
import { catchError, switchMap, throwError } from 'rxjs';


/** Rutas públicas que NO deben disparar auto-refresh en 401 */
const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/github'];

function isPublicRoute(url: string): boolean {
  return PUBLIC_PATHS.some((path) => url.includes(path));
}

/**
 * Interceptor que detecta respuestas 401 y dispara un refresh automático
 * del access_token antes de reintentar la petición original.
 *
 * Se excluyen rutas públicas para evitar loops infinitos
 * (ej. si /auth/refresh devuelve 401, no reintentamos).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPublicRoute(req.url)) {
    return next(req);
  }

  const authAdapter = inject(AuthHttpAdapter);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Intentar refresh silencioso
        return authAdapter.refresh().pipe(
          switchMap(() => {
            // Cookie renovada automáticamente → reintentar la petición original
            return next(req.clone());
          }),
          catchError((refreshError) => {
            // Refresh falló: sesión expirada, propagar el error
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
