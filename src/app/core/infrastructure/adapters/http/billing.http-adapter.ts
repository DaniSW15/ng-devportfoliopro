import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import {
  PlansResponse,
  CheckoutSessionResponse,
  PortalSessionResponse
} from '@core/interfaces/billing.interface';

@Injectable({
  providedIn: 'root',
})
export class BillingHttpAdapter {
  private readonly http = inject(HttpClient);

  getPlans(): Observable<PlansResponse> {
    return this.http.get<PlansResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.BILLING.PLANS}`
    );
  }

  createCheckoutSession(priceId: string): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.BILLING.CHECKOUT}`,
      { priceId }
    );
  }

  createPortalSession(): Observable<PortalSessionResponse> {
    return this.http.post<PortalSessionResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.BILLING.PORTAL}`,
      {}
    );
  }
}
