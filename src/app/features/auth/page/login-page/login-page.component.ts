import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthFacade } from '../../services/auth.facade';
import { Router } from '@angular/router';
import { API_CONFIG } from '@core/config/api.config';

// Icons
import { Spinner } from '@primeicons/angular/spinner';
import { LoginRequest } from '@core/interfaces/auth.interface';
import { email, form, minLength, required, FormRoot, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, RouterModule, Spinner, FormRoot, FormField],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly router = inject(Router);

  readonly authFacade = inject(AuthFacade);
  readonly loginError = signal<string | null>(null);

  /** URL directa al endpoint de GitHub OAuth en el backend */
  readonly githubOAuthUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.GITHUB}`;

  private readonly loginModel = signal<Required<LoginRequest>>({
    email: '',
    password: '',
  });

  readonly loginForm = form<Required<LoginRequest>>(this.loginModel,
    (validators) => {
      required(validators.email, { message: 'El email es obligatorio' });
      email(validators.email, { message: 'El email no es válido' });
      required(validators.password, { message: 'La contraseña es obligatoria' });
      minLength(validators.password, 8, { message: 'Mínimo 8 caracteres' });
    },
    {
      submission: {
        action: async (value) => this.onSubmit(),
      }
    }
  );

  async onSubmit(): Promise<void> {
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    const payload = this.loginForm().value();
    try {
      await this.authFacade.login(payload);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loginError.set(
        error instanceof Error ? error.message : 'Login failed'
      );
    }
  }

  hasError(controlName: 'email' | 'password', errorName: string): boolean {
    const fieldState = this.loginForm();
    const field = (fieldState as any)[controlName];
    return field?.touched?.() && field?.errors?.[errorName];
  }
}
