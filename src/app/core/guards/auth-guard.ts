import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '@features/auth/services/auth.facade';

/**
 * Guard unificado de Autenticación.
 *
 * Soporta dos modos configurables por metadata en la ruta (route.data):
 * 1. requireAuth: true (Default) -> Solo permite acceso a usuarios autenticados.
 * 2. requireAuth: false -> Solo permite acceso a invitados (redirige al dashboard si ya hay sesión).
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  const requireAuth = route.data?.['requireAuth'] ?? true;

  // Modo A: Ruta Protegida (Requiere autenticación)
  if (requireAuth) {
    if (authFacade.isAuthenticated()) {
      return true;
    }

    try {
      await authFacade.refreshSession();
      if (authFacade.isAuthenticated()) {
        return true;
      }
    } catch (error) {
      console.warn('Session validation failed:', error);
    }

    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  // Modo B: Ruta Pública / Invitado (No requiere autenticación)
  if (authFacade.isAuthenticated()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
