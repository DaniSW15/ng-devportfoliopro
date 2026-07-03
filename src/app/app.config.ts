import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { credentialsInterceptor } from '@core/interceptors/credentials-interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { ISnippetRepository } from '@core/domain/repositories/snippet.repositories.interface';
import { SnippetRepository } from '@core/infrastructure/repositories/snippet.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([
      credentialsInterceptor,  // 1° — withCredentials: true en toda petición
      authInterceptor,         // 2° — auto-refresh en 401 para rutas protegidas
      errorHandlerInterceptor,    // 3° — manejo de errores globales
    ])),
    provideRouter(routes),
    {
      provide: UserAuthRepository,
      useClass: UserRepository,
    },
    {
      provide: ISnippetRepository,
      useClass: SnippetRepository,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true
    })
  ]
};
