import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  saveTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);

    if (expiresIn) {
      const expiryTime = new Date().getTime() + expiresIn;
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isTokenExpired(token?: string | null): boolean {
    const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryStr) return true;

    const expiryTime = parseInt(expiryStr, 10);
    const now = new Date().getTime();

    return now >= expiryTime - 60000; // Consider token expired if it's within 1 minute of expiry
  }

  clear(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }
}