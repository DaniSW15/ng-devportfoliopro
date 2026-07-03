import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./page/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./page/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('./page/github-callback-page/github-callback-page.component').then(m => m.GithubCallbackPageComponent)
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];