import { Routes } from "@angular/router";

export const toolsRoutes: Routes = [
    {
        path: 'base64-tool',
        loadComponent: () => import('./pages/base64-tool/base64-tool').then(m => m.Base64Tool),
    },
    {
        path: 'color-palette',
        loadComponent: () => import('./pages/color-palette/color-palette').then(m => m.ColorPalette),
    },
    {
        path: 'json-formatter',
        loadComponent: () => import('./pages/json-formatter/json-formatter').then(m => m.JsonFormatter),
    },
    {
        path: 'jwt-decoder',
        loadComponent: () => import('./pages/jwt-decoder/jwt-decoder').then(m => m.JwtDecoder),
    },
    {
        path: 'password-generator',
        loadComponent: () => import('./pages/password-generator/password-generator').then(m => m.PasswordGenerator),
    },
    {
        path: 'qr-generator',
        loadComponent: () => import('./pages/qr-generator/qr-generator').then(m => m.QrGenerator),
    },
    {
        path: 'timestamp-converter',
        loadComponent: () => import('./pages/timestamp-converter/timestamp-converter').then(m => m.TimestampConverter),
    },
    {
        path: 'uuid-generator',
        loadComponent: () => import('./pages/uuid-generator/uuid-generator').then(m => m.UuidGenerator),
    }
];