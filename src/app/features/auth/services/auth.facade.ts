import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResultDto, LoginDto, RegisterDto } from '../../../core/application/dto/auth.dto';
import { LoginUseCase } from '../../../core/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from '../../../core/application/use-cases/auth/register.use-case';
import { RefreshTokenUseCase } from '../../../core/application/use-cases/auth/refresh-token.use-case';
import { LogoutUseCase } from '../../../core/application/use-cases/auth/logout.use-case';
import { UserAuthRepository } from '../../../core/domain/repositories/user.repositories.interface';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'refreshing' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly refreshTokenUseCase = inject(RefreshTokenUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly userAuthRepository = inject(UserAuthRepository);
  private readonly router = inject(Router);

  // ── Signals ──
  readonly status = signal<AuthStatus>('idle');
  readonly user = signal<AuthResultDto['user'] | null>(null);
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');
  readonly isRefreshing = computed(() => this.status() === 'refreshing');
  readonly isAuthenticated = computed(() => this.status() === 'authenticated' && !!this.user());

  constructor() {
    // Hidratar estado inicial de forma síncrona desde localStorage al recargar la página
    try {
      const storedUser = localStorage.getItem('devportfolio_user');
      if (storedUser) {
        this.user.set(JSON.parse(storedUser));
        this.status.set('authenticated');
      }
    } catch {
      localStorage.removeItem('devportfolio_user');
    }
  }

  // ── Login ──
  async login(credentials: LoginDto): Promise<AuthResultDto> {
    this.status.set('loading');
    this.error.set(null);

    try {
      const result = await this.loginUseCase.execute(credentials);
      this.user.set(result.user);
      localStorage.setItem('devportfolio_user', JSON.stringify(result.user)); // Guardar sesión
      this.status.set('authenticated');
      return result;
    } catch (error) {
      this.status.set('error');
      this.error.set(this.getErrorMessage(error));
      throw error;
    }
  }

  // ── Register ──
  async register(dto: RegisterDto): Promise<AuthResultDto> {
    this.status.set('loading');
    this.error.set(null);

    try {
      const result = await this.registerUseCase.execute(dto);
      this.user.set(result.user);
      localStorage.setItem('devportfolio_user', JSON.stringify(result.user)); // Guardar sesión
      this.status.set('authenticated');
      return result;
    } catch (error) {
      this.status.set('error');
      this.error.set(this.getErrorMessage(error));
      throw error;
    }
  }

  // ── Refresh Session ──
  async refreshSession(): Promise<void> {
    this.status.set('refreshing');
    this.error.set(null);

    try {
      const result = await this.refreshTokenUseCase.execute();
      this.user.set(result.user);
      localStorage.setItem('devportfolio_user', JSON.stringify(result.user));
      this.status.set('authenticated');
    } catch (error) {
      this.status.set('error');
      this.error.set(this.getErrorMessage(error));
      this.user.set(null);
      localStorage.removeItem('devportfolio_user'); // Limpiar sesión si el refresh falla
    }
  }

  // ── Logout (remoto + local) ──
  async logoutRemote(): Promise<void> {
    try {
      await this.logoutUseCase.execute();
    } catch {
      // Si falla el logout remoto, igual limpiamos el estado local
    } finally {
      this.user.set(null);
      this.error.set(null);
      this.status.set('idle');
      localStorage.removeItem('devportfolio_user'); // Limpiar sesión
      this.router.navigate(['/auth/login']); // 👈 Redirigir a login
    }
  }

  // ── GitHub OAuth (Patrón A: redirección directa) ──
  beginGithubLogin(): void {
    this.userAuthRepository.beginGithubLogin();
  }

  // ── Helpers ──
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const httpError = error as { error?: { message?: string } };
      return httpError.error?.message ?? 'Error de autenticación';
    }
    return 'Ocurrió un error de autenticación';
  }
}
