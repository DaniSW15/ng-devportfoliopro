import { inject, Injectable } from '@angular/core';
import { MessageResponse, UserAuthRepository } from '@core/domain/repositories/user.repositories.interface';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenUseCase {
    private readonly userAuthRepository = inject(UserAuthRepository);

    execute(): Promise<MessageResponse> {
        return this.userAuthRepository.refreshToken();
    }
}
