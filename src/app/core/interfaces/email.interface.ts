export interface SendTestEmailRequest {
    to: string;
    name: string;
}

export interface SendResetPasswordRequest {
    to: string;
    token: string;
}

export interface SendVerificationRequest {
    to: string;
    token: string;
}