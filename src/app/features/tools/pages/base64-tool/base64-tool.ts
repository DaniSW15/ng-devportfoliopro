import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Base64Action } from '@core/interfaces/tools.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base64-tool',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, RouterModule],
  templateUrl: './base64-tool.html',
  styleUrl: './base64-tool.scss',
})
export class Base64Tool implements OnInit {
  protected readonly toolFacade = inject(ToolFacade);

  ngOnInit(): void {
    this.toolFacade.clearState();
  }

  readonly inputText = signal<string>('');
  readonly actionType = signal<Base64Action>('encode');
  readonly copied = signal<boolean>(false);

  async onProcess(action: Base64Action): Promise<void> {
    this.actionType.set(action);
    try {
      await this.toolFacade.encodeDecodeBase64({
        input: this.inputText(),
        action: action
      });
    } catch (err) {
      console.error('Error procesando base64', err);
    }
  }

  async copyResult(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
