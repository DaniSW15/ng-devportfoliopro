import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-layout',
  imports: [ButtonModule, RouterOutlet, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected readonly isSidebarOpen = true;
  protected readonly authFacade = inject(AuthFacade);

  get userEmail(): string {
    return this.authFacade.user()?.email || 'Desarrollador';
  }

  logout(): void {
    this.authFacade.logoutRemote();
  }
}
