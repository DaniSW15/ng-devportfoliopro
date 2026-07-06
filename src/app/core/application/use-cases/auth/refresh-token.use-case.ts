import { inject, Injectable } from '@angular/core';
import { UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';
import { AuthResultDto } from '../../dto/auth.dto';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenUseCase {
    private readonly userAuthRepository = inject(UserAuthRepository);

    execute(): Promise<AuthResultDto> {
        return this.userAuthRepository.refreshToken();
    }
}
