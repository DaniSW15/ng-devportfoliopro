import { inject, Injectable } from '@angular/core';

import {
    MessageResponse,
    UserAuthRepository,
} from '../../../domain/repositories/user.repositories.interface';

@Injectable({
    providedIn: 'root',
})
export class LogoutUseCase {
    private readonly userAuthRepository = inject(UserAuthRepository);

    execute(): Promise<MessageResponse> {
        return this.userAuthRepository.logout();
    }
}
