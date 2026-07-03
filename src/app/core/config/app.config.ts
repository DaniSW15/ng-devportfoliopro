/**
 * Configuración general de la aplicación.
 * Centraliza constantes y flags que afectan toda la app.
 */
export const APP_CONFIG = {
  // Información de versión
  VERSION: '1.0.0',
  BUILD_DATE: new Date().toISOString(),

  // Timeouts
  HTTP_TIMEOUT_MS: 15000,
  WEBSOCKET_TIMEOUT_MS: 30000,
  SESSION_TIMEOUT_MS: 3600000, // 1 hora

  // Cache
  CACHE_DURATIONS: {
    USER: 300000,        // 5 minutos
    SNIPPETS: 600000,    // 10 minutos
    API_KEYS: 300000,    // 5 minutos
    TOOLS: 1800000,      // 30 minutos
  },

  // Feature flags
  FEATURES: {
    GITHUB_LOGIN: true,
    SOCIAL_LOGIN: true,
    DARK_MODE: true,
    EXPERIMENTAL_FEATURES: false,
  },

  // Reglas de validación
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_SNIPPET_SIZE: 1000000, // 1MB
    RATE_LIMIT_REQUESTS: 100,
    RATE_LIMIT_WINDOW_MS: 60000, // 1 minuto
  },

  // Modo debug
  DEBUG: false,
} as const;