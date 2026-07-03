// ── Register / Login ──
export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
    githubUsername?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// ── Responses ──
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    user: UserResponse;
}

export interface MessageResponse {
    message: string;
}

/** Backend devuelve { message: 'Token refreshed successfully' } y setea cookie */
export type RefreshResponse = MessageResponse;

/** Backend devuelve { message: 'Logged out successfully' } y limpia cookies */
export type LogoutResponse = MessageResponse;