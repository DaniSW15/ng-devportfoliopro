import { inject, Injectable } from '@angular/core';
import { BillingRepositoryInterface } from '@core/domain/repositories/billing.repositories.interface';
import { CheckoutSessionResponse } from '@core/interfaces/billing.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCheckoutUseCase {
  private readonly repository = inject(BillingRepositoryInterface);

  execute(priceId: string): Promise<CheckoutSessionResponse> {
    return this.repository.createCheckoutSession(priceId);
  }
}
