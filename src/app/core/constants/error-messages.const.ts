/**
 * Mensajes de error estándar de la aplicación.
 * Constantes que NUNCA cambian - son parte del diseño.
 * Propósito: mantener consistencia en mensajes mostrados al usuario.
 * 
 * Uso: import { ERROR_MESSAGES } from '@core/constants/error-messages.const';
 */

export const ERROR_MESSAGES = {
  // === AUTH ===
  AUTH: {
    INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Inicia sesión nuevamente',
    UNAUTHORIZED: 'No tienes permisos para esta acción',
    USER_NOT_FOUND: 'Usuario no encontrado',
    EMAIL_ALREADY_EXISTS: 'Este email ya está registrado',
    WEAK_PASSWORD: 'La contraseña debe tener al menos 8 caracteres',
    GITHUB_LOGIN_FAILED: 'Error al iniciar sesión con GitHub',
    GITHUB_ACCOUNT_NOT_LINKED: 'Tu cuenta de GitHub no está vinculada',
  },

  // === SNIPPETS ===
  SNIPPETS: {
    NOT_FOUND: 'Snippet no encontrado',
    ALREADY_EXISTS: 'Este snippet ya existe',
    INVALID_FORMAT: 'Formato de snippet inválido',
    TOO_LARGE: 'El snippet es demasiado grande (máximo 1MB)',
    CREATION_FAILED: 'Error al crear el snippet',
    UPDATE_FAILED: 'Error al actualizar el snippet',
    DELETE_FAILED: 'Error al eliminar el snippet',
  },

  // === API KEYS ===
  API_KEYS: {
    NOT_FOUND: 'API Key no encontrada',
    INVALID: 'API Key inválida o expirada',
    EXPIRED: 'API Key expirada',
    LIMIT_EXCEEDED: 'Has alcanzado el límite de API Keys',
    REGENERATE_FAILED: 'Error al regenerar la API Key',
    DELETE_FAILED: 'Error al eliminar la API Key',
  },

  // === NETWORK ===
  NETWORK: {
    NO_CONNECTION: 'No hay conexión a internet',
    TIMEOUT: 'La solicitud tardó demasiado. Verifica tu conexión',
    SERVER_ERROR: 'Error del servidor. Intenta más tarde',
    BAD_REQUEST: 'Solicitud inválida',
    FORBIDDEN: 'Acceso denegado',
    NOT_FOUND: 'Recurso no encontrado',
    INTERNAL_ERROR: 'Ocurrió un error inesperado',
  },

  // === BILLING ===
  BILLING: {
    PAYMENT_FAILED: 'El pago no se procesó. Intenta nuevamente',
    INVALID_CARD: 'Tarjeta de crédito inválida',
    SUBSCRIPTION_FAILED: 'Error al crear la suscripción',
    CANCEL_FAILED: 'Error al cancelar la suscripción',
  },

  // === TOOLS ===
  TOOLS: {
    INVALID_INPUT: 'Entrada inválida',
    PROCESSING_ERROR: 'Error al procesar',
    GENERATION_FAILED: 'Error al generar resultado',
  },

  // === VALIDATION ===
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo es obligatorio',
    INVALID_EMAIL: 'Email inválido',
    INVALID_URL: 'URL inválida',
    PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  },

  // === GENERIC ===
  GENERIC: {
    TRY_AGAIN: 'Intenta nuevamente',
    CONTACT_SUPPORT: 'Contacta con soporte técnico',
    UNKNOWN_ERROR: 'Ocurrió un error desconocido',
  },
} as const;