import { Routes } from "@angular/router";

export const snippetsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/snippet-list/snippet-list').then(m => m.SnippetList)
    },
    {
        path: 'new',
        loadComponent: () => import('./pages/snippet-editor/snippet-editor').then(m => m.SnippetEditor)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/snippet-editor/snippet-editor').then(m => m.SnippetEditor)
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/snippet-detail/snippet-detail').then(m => m.SnippetDetail)
    }
];