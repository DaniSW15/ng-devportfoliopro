import { Injectable, signal, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorNotification } from '@core/interfaces/error-notification.interface';

/**
 * Servicio centralizado para notificaciones de error.
 * 
 * ✅ Inyección en constructor = contexto de inyección válido
 * ✅ Evita circular dependencies con interceptores
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  readonly lastError = signal<ErrorNotification | null>(null);
  readonly isOnline = signal<boolean>(navigator.onLine);
  
  private readonly messageService = inject(MessageService);
  private networkListenersSetup = false;

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
    if (this.networkListenersSetup) return;
    this.networkListenersSetup = true;

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
