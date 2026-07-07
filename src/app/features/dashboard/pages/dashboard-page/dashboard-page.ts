import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFacade } from '@features/auth/services/auth.facade';
import { ButtonModule } from 'primeng/button';
import { Key as KeyIcon } from '@primeicons/angular/key';
import { Shield } from '@primeicons/angular/shield';
import { Code } from '@primeicons/angular/code';
import { Palette } from '@primeicons/angular/palette';
import { Lock } from '@primeicons/angular/lock';
import { Qrcode } from '@primeicons/angular/qrcode';
import { Clock } from '@primeicons/angular/clock';
import { Bolt } from '@primeicons/angular/bolt';
import { Cog } from '@primeicons/angular/cog';
import { CreditCard } from '@primeicons/angular/credit-card';
import { File } from '@primeicons/angular/file';
import { Database } from '@primeicons/angular/database';

interface DashboardToolCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  badge?: string;
  badgeClass?: string;
}

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    ButtonModule,
    KeyIcon,
    Shield,
    Code,
    Palette,
    Lock,
    Qrcode,
    Clock,
    Bolt,
    Cog,
    CreditCard,
    File,
    Database,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  readonly user = this.authFacade.user;

  readonly tools: DashboardToolCard[] = [
    {
      title: 'Generador de Claves',
      description: 'Genera contraseñas ultra-seguras con entropía personalizable.',
      icon: 'pi pi-key',
      route: '/tools/password-generator',
    },
    {
      title: 'Decodificador JWT',
      description: 'Inspecciona, valida y lee la firma de JSON Web Tokens.',
      icon: 'pi pi-shield',
      route: '/tools/jwt-decoder',
    },
    {
      title: 'Formateador JSON',
      description: 'Formatea, valida y compacta estructuras JSON.',
      icon: 'pi pi-code',
      route: '/tools/json-formatter',
    },
    {
      title: 'Paleta de Colores',
      description: 'Genera paletas armónicas para proyectos de diseño.',
      icon: 'pi pi-palette',
      route: '/tools/color-palette',
    },
    {
      title: 'Codificador Base64',
      description: 'Codifica y decodifica texto plano en Base64.',
      icon: 'pi pi-lock',
      route: '/tools/base64-tool',
    },
    {
      title: 'Generador QR',
      description: 'Crea códigos QR descargables en alta definición.',
      icon: 'pi pi-qrcode',
      route: '/tools/qr-generator',
    },
    {
      title: 'Unix Timestamp',
      description: 'Convierte marcas de tiempo Epoch UNIX a fechas legibles.',
      icon: 'pi pi-clock',
      route: '/tools/timestamp-converter',
    },
    {
      title: 'Generador de UUID',
      description: 'Genera UUIDs aleatorios v1 o v4 de forma unitaria o bulk.',
      icon: 'pi pi-bolt',
      route: '/tools/uuid-generator',
    },
    {
      title: 'API Keys',
      description: 'Gestiona tus llaves de acceso y estadísticas de solicitudes.',
      icon: 'pi pi-cog',
      route: '/api-keys',
      badge: 'API',
      badgeClass: 'bg-green-500/10 text-green-400 border border-green-500/20',
    },
    {
      title: 'Suscripciones',
      description: 'Administra tus planes de facturación y pasarela de Stripe.',
      icon: 'pi pi-credit-card',
      route: '/billing',
      badge: 'Stripe',
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    },
    {
      title: 'Mis Snippets',
      description: 'Guarda, edita y organiza tus fragmentos de código más usados.',
      icon: 'pi pi-file-code',
      route: '/snippets',
      badge: 'Nuevo',
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    },
    {
      title: 'Api Tester',
      description: 'Cliente HTTP de pruebas REST y GraphQL (tipo Postman).',
      icon: 'pi pi-database',
      route: '/api-tester',
      badge: 'Nuevo',
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    }
  ];

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
