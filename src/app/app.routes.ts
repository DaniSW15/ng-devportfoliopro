import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';
import { MainLayout } from '@shared/layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard], // Protegido
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
            },
            {
                path: 'tools',
                loadChildren: () => import('./features/tools/tools.routes').then((m) => m.toolsRoutes),
            },
            {
                path: 'api-keys',
                loadChildren: () => import('./features/api-keys/api-keys.routes').then((m) => m.apiKeysRoutes),
            },
            {
                path: 'billing',
                loadChildren: () => import('./features/billing/billing.routes').then((m) => m.billingRoutes),
            },
            {
                path: 'snippets',
                loadChildren: () => import('./features/snippets/snippets.routes').then((m) => m.snippetsRoutes),
            },
            {
                path: 'api-tester',
                loadChildren: () => import('./features/api-tester/api-tester.routes').then((m) => m.apiTesterRoutes),
            },
            {
                path: '',
                redirectTo: 'dashboard', // 👈 ¡RECOMENDADO! Apunta a la ruta principal
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'dashboard', // 👈 Evita mandar a login si el usuario ya está navegando
                pathMatch: 'full',
            }
        ],
    },
];
