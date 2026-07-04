import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { RegisterDto } from '@core/application/dto/auth.dto';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register-page.component',
  imports: [FormRoot, FormField,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    MessageModule,
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
  })

  public readonly registerError = signal<boolean>(false);
  public readonly registerSuccess = signal<boolean>(false);

  public readonly emailError = signal<string>('');
  public readonly nameError = signal<string>('');
  public readonly passwordError = signal<string>('');
  public readonly githubUsernameError = signal<string>('');

  public readonly registerForm = form<Required<RegisterDto>>(this.registerModel,
    (validators) => {
      required(validators.email, { message: 'Email is required' });
        email(validators.email, { message: 'Email is invalid' });
        required(validators.name, { message: 'Name is required' });
        required(validators.password, { message: 'Password is required' });
        minLength(validators.password, 8, { message: 'Password must be at least 8 characters long' });
        required(validators.githubUsername, { message: 'GitHub username is required' });
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
      const result = await this.authFacade.register(this.registerForm().value());
      console.log('Registration successful:', result);
      this.registerSuccess.set(true);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Registration failed:', error);
      this.registerError.set(true);
    }
  }
}
