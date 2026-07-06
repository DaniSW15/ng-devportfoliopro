import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthFacade } from '../../services/auth.facade';
import { TokenStorageService } from '@core/infrastructure/services/token-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  readonly authFacade = inject(AuthFacade);
  readonly loginError = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
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
    const control = this.form.controls[controlName];
    return control.touched && control.hasError(errorName);
  }

}
