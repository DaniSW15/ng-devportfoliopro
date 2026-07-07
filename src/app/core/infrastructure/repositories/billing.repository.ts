import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BillingRepositoryInterface } from '@core/domain/repositories/billing.repositories.interface';
import { BillingHttpAdapter } from '../adapters/http/billing.http-adapter';
import {
  PlansResponse,
  CheckoutSessionResponse,
  PortalSessionResponse
} from '@core/interfaces/billing.interface';

@Injectable()
export class BillingRepository implements BillingRepositoryInterface {
  private readonly httpAdapter = inject(BillingHttpAdapter);

  getPlans(): Promise<PlansResponse> {
    return firstValueFrom(this.httpAdapter.getPlans());
  }

  createCheckoutSession(priceId: string): Promise<CheckoutSessionResponse> {
    return firstValueFrom(this.httpAdapter.createCheckoutSession(priceId));
  }

  createPortalSession(): Promise<PortalSessionResponse> {
    return firstValueFrom(this.httpAdapter.createPortalSession());
  }
}
