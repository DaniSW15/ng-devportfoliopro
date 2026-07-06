import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-page',
  imports: [ButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  logout(): void {
    const logoutResult = this.authFacade.logoutRemote();
    if (logoutResult instanceof Promise) {
      logoutResult
        .then(() => {
          this.router.navigate(['/auth/login']);
        })
        .catch((error) => {
          console.error('Logout failed:', error);
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
