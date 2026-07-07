import { inject, Injectable } from '@angular/core';
import { BillingRepositoryInterface } from '@core/domain/repositories/billing.repositories.interface';
import { PortalSessionResponse } from '@core/interfaces/billing.interface';

@Injectable({
  providedIn: 'root',
})
export class CreatePortalUseCase {
  private readonly repository = inject(BillingRepositoryInterface);

  execute(): Promise<PortalSessionResponse> {
    return this.repository.createPortalSession();
  }
}
