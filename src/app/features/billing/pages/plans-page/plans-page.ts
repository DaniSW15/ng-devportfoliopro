import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingFacade } from '../../services/billing.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-plans-page',
  imports: [CommonModule, ButtonModule, MessageModule],
  templateUrl: './plans-page.html',
  styleUrl: './plans-page.scss',
})
export class PlansPage implements OnInit {
  protected readonly facade = inject(BillingFacade);

  readonly priceIds = {
    premium: 'price_premium_monthly',
    enterprise: 'price_enterprise_monthly',
  };

  ngOnInit(): void {
    this.facade.loadPlans();
  }

  async onSelectPlan(planName: 'free' | 'premium' | 'enterprise'): Promise<void> {
    if (planName === 'free') {
      return;
    }

    const priceId = planName === 'premium' ? this.priceIds.premium : this.priceIds.enterprise;
    try {
      await this.facade.subscribeToPlan(priceId);
    } catch (err) {
      console.error('Error al iniciar el checkout', err);
    }
  }

  async onOpenBillingPortal(): Promise<void> {
    try {
      await this.facade.openCustomerPortal();
    } catch (err) {
      console.error('Error al abrir portal', err);
    }
  }
}
