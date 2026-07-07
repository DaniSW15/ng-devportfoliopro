import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiKeyFacade } from '../../services/api-key.facade';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ApiKeyResponse } from '@core/interfaces/api-key.interface';

@Component({
  selector: 'app-api-key-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './api-key-list.html',
  styleUrl: './api-key-list.scss',
})
export class ApiKeyList implements OnInit {
  protected readonly facade = inject(ApiKeyFacade);

  // Estados locales para los diálogos
  readonly isCreateModalVisible = signal<boolean>(false);
  readonly isStatsModalVisible = signal<boolean>(false);
  readonly copied = signal<boolean>(false);

  // Campos de formulario de creación
  readonly keyName = signal<string>('');
  readonly expiresAt = signal<string>('');

  ngOnInit(): void {
    this.facade.loadApiKeys();
  }

  showCreateModal(): void {
    this.keyName.set('');
    this.expiresAt.set('');
    this.facade.newlyCreatedKey.set(null);
    this.isCreateModalVisible.set(true);
  }

  async onCreate(): Promise<void> {
    if (!this.keyName().trim()) return;
    try {
      await this.facade.generateApiKey({
        name: this.keyName().trim(),
        expiresAt: this.expiresAt() ? new Date(this.expiresAt()).toISOString() : undefined,
      });
    } catch (err) {
      console.error('Error al crear API Key', err);
    }
  }

  async onRevoke(id: string): Promise<void> {
    try {
      await this.facade.revokeApiKey(id);
    } catch (err) {
      console.error('Error al revocar API Key', err);
    }
  }

  async onDelete(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar esta API Key permanentemente?')) {
      try {
        await this.facade.deleteApiKey(id);
      } catch (err) {
        console.error('Error al eliminar API Key', err);
      }
    }
  }

  async showStats(id: string): Promise<void> {
    this.isStatsModalVisible.set(true);
    await this.facade.loadApiKeyStats(id);
  }

  async copyToClipboard(text: string): Promise<void> {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
