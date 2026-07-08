import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';
import { Home } from '@primeicons/angular/home';
import { Key as KeyIcon } from '@primeicons/angular/key';
import { Shield } from '@primeicons/angular/shield';
import { Code } from '@primeicons/angular/code';
import { Lock } from '@primeicons/angular/lock';
import { CreditCard } from '@primeicons/angular/credit-card';
import { File } from '@primeicons/angular/file';
import { Database } from '@primeicons/angular/database';
import { SignOut as SignOutIcon } from '@primeicons/angular/sign-out';

@Component({
  selector: 'app-main-layout',
  imports: [
    ButtonModule,
    RouterOutlet,
    RouterModule,
    Home,
    KeyIcon,
    Shield,
    Code,
    Lock,
    CreditCard,
    File,
    Database,
    SignOutIcon,
  ],
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
