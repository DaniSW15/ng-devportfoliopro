import { inject, Injectable } from '@angular/core';
import { BillingRepositoryInterface } from '@core/domain/repositories/billing.repositories.interface';
import { PlansResponse } from '@core/interfaces/billing.interface';

@Injectable({
  providedIn: 'root',
})
export class GetPlansUseCase {
  private readonly repository = inject(BillingRepositoryInterface);

  execute(): Promise<PlansResponse> {
    return this.repository.getPlans();
  }
}
