import { Routes } from "@angular/router";
import { authGuard } from "@core/guards/auth-guard";

export const authRoutes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    data: { requireAuth: false },
    loadComponent: () => import('./page/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'register',
    canActivate: [authGuard],
    data: { requireAuth: false },
    loadComponent: () => import('./page/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('./page/github-callback-page/github-callback-page.component').then(m => m.GithubCallbackPageComponent)
  },
];