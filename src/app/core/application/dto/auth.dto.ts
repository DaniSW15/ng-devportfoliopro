import { UserEntity } from "@core/domain/entities/user.entity";

export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	email: string;
	name: string;
	password: string;
	githubUsername?: string;
}

export interface AuthResultDto {
	user: UserEntity;
}
