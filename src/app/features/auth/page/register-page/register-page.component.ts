import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { RegisterDto } from '@core/application/dto/auth.dto';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { API_CONFIG } from '@core/config/api.config';
import { InputTextModule } from 'primeng/inputtext';

// Icons
import { Spinner } from '@primeicons/angular/spinner';

@Component({
  selector: 'app-register-page',
  imports: [
    FormRoot,
    FormField,
    RouterModule,
    InputTextModule,
    Spinner,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  protected readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly registerModel = signal<Required<RegisterDto>>({
    email: '',
    name: '',
    password: '',
    githubUsername: '',
  });

  public readonly registerError = signal<boolean>(false);
  public readonly registerSuccess = signal<boolean>(false);

  /** URL directa al endpoint de GitHub OAuth en el backend */
  readonly githubOAuthUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.GITHUB}`;

  public readonly registerForm = form<Required<RegisterDto>>(this.registerModel,
    (validators) => {
      required(validators.email, { message: 'El email es obligatorio' });
      email(validators.email, { message: 'El email no es válido' });
      required(validators.name, { message: 'El nombre es obligatorio' });
      required(validators.password, { message: 'La contraseña es obligatoria' });
      minLength(validators.password, 8, { message: 'Mínimo 8 caracteres' });
      required(validators.githubUsername, { message: 'El usuario de GitHub es obligatorio' });
    },
    {
      submission: {
        action: async (value) => this.register(),
      }
    }
  );

  private async register(): Promise<void> {
    this.registerError.set(false);
    this.registerSuccess.set(false);

    try {
      await this.authFacade.register(this.registerForm().value());
      this.registerSuccess.set(true);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Registration failed:', error);
      this.registerError.set(true);
    }
  }
}
