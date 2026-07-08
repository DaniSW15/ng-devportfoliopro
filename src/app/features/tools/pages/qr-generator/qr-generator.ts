import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { QrFormat } from '@core/interfaces/tools.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qr-generator',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, RouterModule],
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.scss',
})
export class QrGenerator {
  protected readonly toolFacade = inject(ToolFacade);
  readonly Number = Number;

  readonly qrText = signal<string>('');
  readonly qrWidth = signal<number>(250);
  readonly qrFormat = signal<QrFormat>('png');

  async onGenerate(): Promise<void> {
    try {
      await this.toolFacade.generateQr({
        text: this.qrText(),
        width: this.qrWidth(),
        format: this.qrFormat()
      });
    } catch (err) {
      console.error('Error al generar código QR', err);
    }
  }

  downloadQr(base64Image: string, format: string): void {
    const link = document.createElement('a');
    link.href = `data:image/${format};base64,${base64Image}`;
    link.download = `qrcode-${Date.now()}.${format}`;
    link.click();
  }
}
