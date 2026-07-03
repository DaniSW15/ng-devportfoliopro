export type ErrorSeverity = 'info' | 'warning' | 'error' | 'success';

export interface ErrorNotification {
    severity: ErrorSeverity;
    summary: string;
    detail: string;
    life?: number;
}