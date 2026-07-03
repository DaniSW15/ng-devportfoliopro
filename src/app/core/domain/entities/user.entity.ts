export type UserRole = 'user' | 'admin';

export interface UserEntity {
	id: string;
	email: string;
	name: string;
	avatarUrl: string;
	role: UserRole;
}
