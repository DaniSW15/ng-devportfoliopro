export interface PlanFeatures {
    price: number;
    features: string[];
}

export interface PlansResponse {
    free: PlanFeatures;
    premium: PlanFeatures;
    enterprise: PlanFeatures;
}

export interface CheckoutSessionResponse {
    url: string;
}

export interface PortalSessionResponse {
    url: string;
}