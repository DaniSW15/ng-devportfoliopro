import { inject, Injectable } from '@angular/core';
import { AuthSession, LoginCredentials, MessageResponse, RegisterAccountInput, UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';
import { firstValueFrom } from 'rxjs';
import { AuthHttpAdapter } from '../adapters/http/auth.http-adapter';
import { AuthResponse } from '@core/interfaces/auth.interface';
import { VALIDATION_RULES } from '@core/constants/validation.const';
import { ERROR_MESSAGES } from '@core/constants/error-messages.const';
import { UserMapper } from '@core/application/mappers/user.mapper';

@Injectable()
export class UserRepository implements UserAuthRepository {
	private readonly authHttpAdapter = inject(AuthHttpAdapter);

	async login(credentials: LoginCredentials): Promise<AuthSession> {
		if (credentials.email?.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
			throw new Error(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL);
		}
		const response = await firstValueFrom(this.authHttpAdapter.login(credentials));
		return this.toAuthSession(response);
	}

	async register(input: RegisterAccountInput): Promise<AuthSession> {
		const response = await firstValueFrom(this.authHttpAdapter.register(input));
		return this.toAuthSession(response);
	}

	async logout(): Promise<MessageResponse> {
		return firstValueFrom(this.authHttpAdapter.logout());
	}

	async refreshToken(): Promise<MessageResponse> {
		return firstValueFrom(this.authHttpAdapter.refresh());
	}

	beginGithubLogin(): void {
		this.authHttpAdapter.loginWithGitHub();
	}

	private toAuthSession(response: AuthResponse): AuthSession {
		return {
			user: UserMapper.fromHttpResponse(response),
		};
	}
}
