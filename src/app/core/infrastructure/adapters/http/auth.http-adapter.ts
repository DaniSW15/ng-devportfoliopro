import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { AuthResponse, LoginRequest, MessageResponse, RegisterRequest, RefreshResponse } from '@core/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthHttpAdapter {
	private readonly http = inject(HttpClient)

	login(payload: LoginRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGIN}`, payload);
	}

	register(payload: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REGISTER}`, payload);
	}

    refresh(): Observable<RefreshResponse> {
        return this.http.post<RefreshResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REFRESH}`, {});
    }

    logout(): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGOUT}`, {});
    }

    /** Redirige al navegador a GitHub OAuth */
    loginWithGitHub(): void {
        const githubOAuthUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.GITHUB}`;
        window.location.href = githubOAuthUrl;
    }
}
