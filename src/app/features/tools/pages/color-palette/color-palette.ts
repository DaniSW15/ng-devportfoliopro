import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PaletteType } from '@core/interfaces/tools.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-color-palette',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, RouterModule],
  templateUrl: './color-palette.html',
  styleUrl: './color-palette.scss',
})
export class ColorPalette {
  protected readonly toolFacade = inject(ToolFacade);

  readonly baseColor = signal<string>('#6366f1');
  readonly paletteType = signal<PaletteType>('monochromatic');

  readonly copiedColor = signal<string | null>(null);

  async onGenerate(): Promise<void> {
    try {
      await this.toolFacade.generatePalette({
        baseColor: this.baseColor(),
        type: this.paletteType()
      });
    } catch (err) {
      console.error('Error al generar paleta', err);
    }
  }

  async copyColor(hex: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(hex);
      this.copiedColor.set(hex);
      setTimeout(() => {
        if (this.copiedColor() === hex) {
          this.copiedColor.set(null);
        }
      }, 1500);
    } catch (err) {
      console.error('Error al copiar color', err);
    }
  }
}
