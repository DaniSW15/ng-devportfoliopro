/**
 * Reglas de validación - Constantes que NUNCA cambian.
 * Propósito: centralizar límites y restricciones de negocio.
 * 
 * Uso: import { VALIDATION_RULES } from '@core/constants/validation.const';
 */

export const VALIDATION_RULES = {
  // === PASSWORD ===
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  },

  // === EMAIL ===
  EMAIL: {
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // === USER ===
  USER: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 50,
    USERNAME_PATTERN: /^[a-zA-Z0-9_-]+$/,
  },

  // === SNIPPETS ===
  SNIPPETS: {
    MAX_SIZE_BYTES: 1000000, // 1MB
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MIN_CODE_LENGTH: 1,
    SUPPORTED_LANGUAGES: [
      'typescript',
      'javascript',
      'html',
      'css',
      'python',
      'java',
      'csharp',
      'php',
      'ruby',
      'go',
      'rust',
      'sql',
      'bash',
      'yaml',
      'json',
      'xml',
    ],
  },

  // === API KEYS ===
  API_KEYS: {
    PREFIX: 'dev_',
    LENGTH: 32,
    MAX_KEYS_PER_USER: 10,
  },

  // === PAGINATION ===
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
  },

  // === RATE LIMITING ===
  RATE_LIMITING: {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION_MS: 900000, // 15 minutos
    REQUESTS_PER_MINUTE: 100,
    API_KEY_REQUESTS_PER_HOUR: 1000,
  },

  // === SESSION ===
  SESSION: {
    TIMEOUT_MS: 3600000, // 1 hora
    REFRESH_TOKEN_EXPIRY_MS: 604800000, // 7 días
    IDLE_TIMEOUT_MS: 1800000, // 30 minutos sin actividad
  },

  // === FILE UPLOADS ===
  FILE_UPLOADS: {
    MAX_SIZE_BYTES: 10485760, // 10MB
    ALLOWED_TYPES: ['application/json', 'text/plain', 'text/csv'],
  },
} as const;