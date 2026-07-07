import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '@features/tools/service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-jwt-decoder',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './jwt-decoder.html',
  styleUrl: './jwt-decoder.scss',
})
export class JwtDecoder {
  protected readonly toolFacade = inject(ToolFacade);

  readonly tokenInput = signal<string>('');

  async onDecode(): Promise<void> {
    if (!this.tokenInput().trim()) return;

    await this.toolFacade.decodeJwt({ token: this.tokenInput().trim() });
  }

  getExpiration(payload: Record<string, unknown>): number | undefined {
    const exp = payload['exp'];
    return typeof exp === 'number' ? exp : undefined;
  }

  isExpired(exp?: number): boolean {
    if (!exp) return false;
    const expirationDate = new Date(exp * 1000);
    return expirationDate < new Date();
  }
}
