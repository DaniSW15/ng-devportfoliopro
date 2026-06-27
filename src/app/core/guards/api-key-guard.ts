import { CanActivateFn } from '@angular/router';

export const apiKeyGuard: CanActivateFn = (route, state) => {
  return true;
};
