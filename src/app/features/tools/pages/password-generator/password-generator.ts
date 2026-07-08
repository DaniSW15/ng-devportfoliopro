import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-generator',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    CheckboxModule,
    InputNumberModule,
    MessageModule,
    RouterModule
  ],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.scss',
})
export class PasswordGenerator implements OnInit {
  protected readonly toolFacade = inject(ToolFacade);

  ngOnInit(): void {
    this.toolFacade.clearState();
  }

  // Signals locales para las opciones del generador
  readonly length = signal<number>(16);
  readonly uppercase = signal<boolean>(true);
  readonly lowercase = signal<boolean>(true);
  readonly numbers = signal<boolean>(true);
  readonly symbols = signal<boolean>(true);

  readonly copied = signal<boolean>(false);

  async onGenerate(): Promise<void> {
    this.copied.set(false);
    await this.toolFacade.generatePassword({
      length: this.length(),
      uppercase: this.uppercase(),
      lowercase: this.lowercase(),
      numbers: this.numbers(),
      symbols: this.symbols(),
    });
  }

  async copyToClipboard(text: string): Promise<void> {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles', err);
    }
  }
}
