import { inject, Injectable } from '@angular/core';
import { AuthResultDto, RegisterDto } from '@core/application/dto/auth.dto';
import { RegisterAccountInput, UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';

@Injectable({
    providedIn: 'root',
})
export class RegisterUseCase {
    private readonly userAuthRepository = inject(UserAuthRepository);

    execute(payload: RegisterDto): Promise<AuthResultDto> {
        const input: RegisterAccountInput = {
            email: payload.email,
            name: payload.name,
            password: payload.password,
            githubUsername: payload.githubUsername,
        };

        return this.userAuthRepository.register(input);
    }
}
