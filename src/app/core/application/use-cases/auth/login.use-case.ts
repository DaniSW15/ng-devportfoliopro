import { inject, Injectable } from '@angular/core';
import { AuthResultDto, LoginDto } from '@core/application/dto/auth.dto';
import { LoginCredentials, UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginUseCase {
    private readonly userAuthRepository = inject(UserAuthRepository);

    execute(payload: LoginDto): Promise<AuthResultDto> {
        const credentials: LoginCredentials = {
            email: payload.email,
            password: payload.password,
        };

        return this.userAuthRepository.login(credentials);
    }
}
