import { environment } from '@environments/environment';

/**
 * Configuración centralizada de endpoints de la API.
 * Propósito: único lugar donde cambian todas las rutas.
 * Usado por: adapters HTTP, interceptores, servicios.
 */
export const API_CONFIG = {
  BASE_URL: environment.apiUrl,
  WS_URL: environment.wsUrl,

  // === AUTH ENDPOINTS ===
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    GITHUB: '/auth/github',
    GITHUB_CALLBACK: '/auth/github/callback',
  },

  // === TOOLS ENDPOINTS ===
  TOOLS: {
    PASSWORD_GENERATOR: '/tools/password-generator',
    JWT_DECODER: '/jwt-decoder',
    BASE64: '/tools/base64-tool',
    JSON_FORMATTER: '/json-formatter',
    COLOR_PALETTE: '/tools/color-palette',
    QR_GENERATOR: '/qr-generator',
    UUID_GENERATOR: '/tools/uuid-generator',
    TIMESTAMP_CONVERTER: '/tools/timestamp-converter',
    API_TESTER: '/api-tester',
  },

  // === SNIPPETS ENDPOINTS ===
  SNIPPETS: {
    LIST: '/snippet-manager',
    DETAIL: (id: string) => `/snippet-manager/${id}`,
    CREATE: '/snippet-manager',
    UPDATE: (id: string) => `/snippet-manager/${id}`,
    DELETE: (id: string) => `/snippet-manager/${id}`,
    SEARCH: (query: string) => `/snippet-manager/search?q=${query}`,
  },

  // === API KEYS ENDPOINTS ===
  API_KEYS: {
    LIST: '/api-keys',
    CREATE: '/api-keys',
    DELETE: (id: string) => `/api-keys/${id}`,
    DELETE_PERMANENT: (id: string) => `/api-keys/${id}/permanent`,
    STATS: (id: string) => `/api-keys/${id}/stats`,
  },

  // === BILLING ENDPOINTS ===
  BILLING: {
    PLANS: '/billing/plans',
    CHECKOUT: '/billing/create-checkout-session',
    PORTAL: '/billing/create-portal-session',
  },
} as const;