import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '@features/tools/service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-json-formatter',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.scss',
})
export class JsonFormatter {
  protected readonly toolFacade = inject(ToolFacade);
  // Input de texto escrito por el usuario
  readonly rawJson = signal<string>('');
  readonly copied = signal<boolean>(false);
  // Formatea el JSON agregándole espacios
  async onFormat(): Promise<void> {
    if (!this.rawJson().trim()) return;
    this.copied.set(false);
    await this.toolFacade.formatJson({
      jsonString: this.rawJson(),
      action: 'format',
      spaces: 2,
    });
  }
  // Minifica el JSON eliminando todos los espacios en blanco
  async onMinify(): Promise<void> {
    if (!this.rawJson().trim()) return;
    this.copied.set(false);
    await this.toolFacade.formatJson({
      jsonString: this.rawJson(),
      action: 'minify',
      spaces: 0,
    });
  }
  async copyResult(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
