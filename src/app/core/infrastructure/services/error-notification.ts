import { inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorNotification } from '@core/interfaces/error-notification.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  private readonly messageService = inject(MessageService);
  readonly lastError = signal<ErrorNotification | null>(null);
  readonly isOnline = signal<boolean>(navigator.onLine);

  constructor() {
    this.setupNetworkListeners();
  }

  showError(notification: ErrorNotification): void {
    this.lastError.set(notification);
    this.messageService.add({
      severity: notification.severity,
      summary: notification.summary,
      detail: notification.detail,
      life: notification.life ?? 5000,
    });
  }

  showNetworkError(statusCode: number, message?: string): void {
    if (statusCode === 0 || !this.isOnline()) {
      this.showError({
        severity: 'error',
        summary: 'Sin Conexión',
        detail: message ?? 'Actualmente estás sin conexión. Por favor, verifica tu conexión a internet.',
        life: 7000,
      });
    } else {
      this.showError({
        severity: 'error',
        summary: 'Error de Red',
        detail: message ?? `Ocurrió un error de red. Código de estado: ${statusCode}`,
        life: 5000,
      });
    }
  }

  showTimeoutError(): void {
    this.showError({
      severity: 'warning',
      summary: 'Tiempo de Espera Excedido',
      detail: 'La solicitud ha tardado demasiado en responder. Por favor, inténtalo de nuevo más tarde.',
      life: 5000,
    });
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Conexión Restaurada',
        detail: 'Ya estás en línea.',
        life: 3000,
      });
    });

    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Sin Conexión',
        detail: 'Parece que perdiste la conexión a internet.',
        life: 0, // persiste hasta que vuelva online
      });
    });
  }
}
