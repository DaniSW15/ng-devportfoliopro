import { inject, Injectable, signal, computed } from '@angular/core';
import { GetPlansUseCase, CreateCheckoutUseCase, CreatePortalUseCase } from '@core/application/use-cases/billing';
import { PlansResponse } from '@core/interfaces/billing.interface';
import { parseApiError } from '@core/interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root',
})
export class BillingFacade {
  private readonly getPlansUseCase = inject(GetPlansUseCase);
  private readonly createCheckoutUseCase = inject(CreateCheckoutUseCase);
  private readonly createPortalUseCase = inject(CreatePortalUseCase);

  // ── Signals ──
  readonly plans = signal<PlansResponse | null>(null);
  readonly status = signal<'idle' | 'loading' | 'error'>('idle');
  readonly error = signal<string | null>(null);

  // ── Computed ──
  readonly isLoading = computed(() => this.status() === 'loading');

  // ── Acciones ──

  async loadPlans(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const response = await this.getPlansUseCase.execute();
      this.plans.set(response);
      this.status.set('idle');
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al cargar los planes de suscripción'));
    }
  }

  async subscribeToPlan(priceId: string): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const session = await this.createCheckoutUseCase.execute(priceId);
      if (session.url) {
        // Redirigir al usuario al checkout de Stripe
        window.location.href = session.url;
      } else {
        throw new Error('No se generó la URL de checkout de Stripe');
      }
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al iniciar el flujo de pago con Stripe'));
      throw err;
    }
  }

  async openCustomerPortal(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      const session = await this.createPortalUseCase.execute();
      if (session.url) {
        // Redirigir al usuario al portal del cliente de Stripe
        window.location.href = session.url;
      } else {
        throw new Error('No se generó la URL del portal de Stripe');
      }
    } catch (err: unknown) {
      this.status.set('error');
      this.error.set(parseApiError(err, 'Error al abrir el portal de facturación'));
      throw err;
    }
  }
}

