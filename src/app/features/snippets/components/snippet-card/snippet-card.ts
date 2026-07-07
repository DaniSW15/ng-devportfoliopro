import { Component, input, output, signal } from '@angular/core';
import { SnippetResultDto } from '@core/application/dto/snippet.dto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-snippet-card',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './snippet-card.html',
  styleUrl: './snippet-card.scss',
})
export class SnippetCard {
  readonly snippet = input.required<SnippetResultDto>();
  readonly delete = output<string>();
  readonly copied = signal<boolean>(false);

  async copyToClipboard(event: Event): Promise<void> {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(this.snippet().content);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar el código', err);
    }
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.snippet().id);
  }
}
