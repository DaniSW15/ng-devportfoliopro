// ── Password Generator ──
export interface PasswordGeneratorRequest {
    length?: number;
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
    count?: number;       // Solo para /multiple
}

export interface PasswordGeneratorResponse {
    password: string;
    length: number;
    entropy: number;
}

// ── JWT Decoder ──
export interface JwtDecodeRequest {
    token: string;
}

export interface JwtDecodeResponse {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
}

// ── JSON Formatter ──
export type JsonAction = 'format' | 'minify' | 'validate';

export interface JsonFormatterRequest {
    jsonString: string;
    action: JsonAction;
}

export interface JsonFormatterResponse {
    result: string;
    isValid: boolean;
    error: string | null;
}

// ── Base64 Tool ──
export type Base64Action = 'encode' | 'decode';

export interface Base64Request {
    text: string;
    action: Base64Action;
}

export interface Base64Response {
    result: string;
    original: string;
    action: string;
}

// ── Color Palette ──
export type PaletteType = 'monochromatic' | 'analogous' | 'complementary' | 'triadic';

export interface ColorPaletteRequest {
    baseColor: string; // Hex: #3b82f6
    type: PaletteType;
}

export interface ColorPaletteResponse {
    palette: string[];
    baseColor: string;
    type: string;
}

// ── Timestamp Converter ──
export interface TimestampCurrentResponse {
    timestamp: number;
    iso: string;
    utc: string;
    local: string;
}

export interface TimestampToDateRequest {
    timestamp: number;
}

export interface TimestampToDateResponse {
    date: string;
    iso: string;
    utc: string;
    local: string;
}

export interface DateToTimestampRequest {
    date: string;
}

export interface DateToTimestampResponse {
    timestamp: number;
    date: string;
}

// ── UUID Generator ──
export type UuidVersion = 'v1' | 'v4' | 'v5';

export interface UuidSingleResponse {
    uuid: string;
    version: string;
}

export interface UuidBulkResponse {
    uuids: string[];
    count: number;
}

// ── QR Generator ──
export type QrFormat = 'png' | 'svg' | 'utf8';

export interface QrGeneratorRequest {
    text: string;
    width?: number;
    margin?: number;
    format?: QrFormat;
}

export interface QrGeneratorResponse {
    qrCode: string;
    text: string;
    width: number;
    format: string;
    mimeType: string;
}

// ── Snippet Manager ──
export interface CreateSnippetRequest {
    title: string;
    content: string;
    language: string;
    description?: string;
    isPublic?: boolean;
    tags?: string[];
}

export interface UpdateSnippetRequest extends Partial<CreateSnippetRequest> { }

export interface SnippetResponse extends CreateSnippetRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

// ── API Tester ──
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
export type BodyType = 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'graphql';

export interface HttpHeader {
    key: string;
    value: string;
}

export interface GraphQLQuery {
    query: string;
    variables?: Record<string, unknown>;
    operationName?: string;
}

export interface ApiTesterRequest {
    method: HttpMethod;
    url: string;
    headers?: HttpHeader[];
    bodyType?: BodyType;
    body?: string;
    graphql?: GraphQLQuery;
    timeout?: number;
}

export interface ApiTesterResponse {
    success: boolean;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: unknown;
    size: number;
    time: number;
    error?: string;
    timestamp: string;
}

export interface SaveRequestPayload {
    name: string;
    description?: string;
    tags?: string[];
    request: ApiTesterRequest;
}

export interface CollectionPayload {
    id?: string;
    name: string;
    description?: string;
    requests: SaveRequestPayload[];
}