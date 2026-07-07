import { Routes } from '@angular/router';

export const apiTesterRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/api-tester/api-tester').then((m) => m.ApiTester),
  },
];
