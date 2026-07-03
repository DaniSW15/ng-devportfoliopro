export interface CreateApiKeyRequest {
    name: string;
    expiresAt?: string;
}

export interface ApiKeyResponse {
    id: string;
    name: string;
    key: string;
    isActive: boolean;
    usageCount: number;
    lastUsedAt?: string;
    expiresAt?: string;
    createdAt: string;
}

export interface ApiKeyListResponse {
    items: Omit<ApiKeyResponse, 'key'>[];
    total: number;
}

export interface ApiKeyStatsResponse {
    id: string;
    requestCount: number;
    lastUsedAt: string;
}