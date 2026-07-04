import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthFacade } from '../../features/auth/services/auth.facade';
import { TokenStorageService } from '@core/infrastructure/services/token-storage-service';

export const authGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  const tokenStorage = inject(TokenStorageService);

  if (authFacade.isAuthenticated()) {
    return true;
  }

  const token = tokenStorage.getAccessToken();
  console.log('Token from storage:', token);

  if (token) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: router.url },
    });
  }

  if (tokenStorage.isTokenExpired(token)) {
    tokenStorage.clear();
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: router.url, sessionExpired: true },
    });
  }

  return true;
};
