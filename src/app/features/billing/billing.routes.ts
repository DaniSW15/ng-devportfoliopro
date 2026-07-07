import { Routes } from "@angular/router";

export const billingRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/plans-page/plans-page').then(m => m.PlansPage)
    }
];
