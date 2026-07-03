import { API_CONFIG } from './api.config';

export const WEBSOCKET_CONFIG = {
  URL: API_CONFIG.WS_URL,
  RECONNECT_INTERVAL_MS: 3000,
  MAX_RETRIES: 5,
  PING_INTERVAL_MS: 30000,
  EVENTS: {
    USER_ONLINE: 'user:online',
    USER_OFFLINE: 'user:offline',
    SNIPPET_SHARED: 'snippet:shared',
    NOTIFICATION: 'notification:new',
  },
} as const;