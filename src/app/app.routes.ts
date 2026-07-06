import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
        canActivate: [authGuard], // Protegido
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
];
