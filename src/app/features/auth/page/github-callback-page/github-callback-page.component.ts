import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFacade } from '../../services/auth.facade';

/**
 * Pantalla de retorno de GitHub OAuth.
 *
 * Flujo:
 * 1. Backend redirige aquí tras completar el OAuth con GitHub.
 * 2. Las cookies (access_token, refresh_token) ya están seteadas por el backend.
 * 3. Este componente dispara refreshSession() para hidratar los signals.
 * 4. Redirige a /dashboard.
 */
@Component({
  selector: 'app-github-callback-page',
  standalone: true,
  template: `
    <div class="callback-container">
      <p>Autenticando con GitHub...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 1.25rem;
      color: #888;
    }
  `],
})
export class GithubCallbackPageComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    try {
      await this.authFacade.refreshSession();
      await this.router.navigate(['/dashboard']);
    } catch {
      await this.router.navigate(['/auth/login']);
    }
  }
}
