import { Routes } from "@angular/router";

export const apiKeysRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/api-key-list/api-key-list').then(m => m.ApiKeyList)
    }
];