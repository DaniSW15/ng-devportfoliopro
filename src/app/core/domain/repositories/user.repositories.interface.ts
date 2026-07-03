import { UserEntity } from '../entities/user.entity';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterAccountInput {
	email: string;
	name: string;
	password: string;
	githubUsername?: string;
}

export interface AuthSession {
	user: UserEntity;
}

export interface MessageResponse {
    message: string;
}

export abstract class UserAuthRepository {
	abstract login(credentials: LoginCredentials): Promise<AuthSession>;
	abstract register(input: RegisterAccountInput): Promise<AuthSession>;
    abstract logout(): Promise<MessageResponse>;
    abstract refreshToken(): Promise<MessageResponse>;
    abstract beginGithubLogin(): void;
}
