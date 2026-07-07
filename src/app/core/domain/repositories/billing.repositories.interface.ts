import {
  PlansResponse,
  CheckoutSessionResponse,
  PortalSessionResponse
} from '@core/interfaces/billing.interface';

export abstract class BillingRepositoryInterface {
  abstract getPlans(): Promise<PlansResponse>;
  abstract createCheckoutSession(priceId: string): Promise<CheckoutSessionResponse>;
  abstract createPortalSession(): Promise<PortalSessionResponse>;
}
