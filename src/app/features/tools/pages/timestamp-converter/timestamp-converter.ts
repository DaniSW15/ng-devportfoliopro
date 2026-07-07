import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-timestamp-converter',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './timestamp-converter.html',
  styleUrl: './timestamp-converter.scss',
})
export class TimestampConverter implements OnInit {
  protected readonly toolFacade = inject(ToolFacade);

  readonly mode = signal<'to-date' | 'to-timestamp'>('to-date');
  readonly timestampInput = signal<string>('');
  readonly dateInput = signal<string>('');
  readonly copied = signal<boolean>(false);

  async ngOnInit(): Promise<void> {
    await this.onGetCurrent();
  }

  async onGetCurrent(): Promise<void> {
    try {
      await this.toolFacade.fetchCurrentTimestamp();
      const current = this.toolFacade.timestampResult();
      if (current && 'timestamp' in current) {
        const currentData = current as any;
        this.timestampInput.set(String(currentData.timestamp));
        this.dateInput.set(currentData.iso);
      }
    } catch (err) {
      console.error('Error al cargar timestamp actual', err);
    }
  }

  async onConvert(): Promise<void> {
    if (this.mode() === 'to-date') {
      try {
        await this.toolFacade.convertTimestampToDate({
          timestamp: Number(this.timestampInput())
        });
      } catch (err) {
        console.error('Error al convertir a fecha', err);
      }
    } else {
      try {
        await this.toolFacade.convertDateToTimestamp({
          date: this.dateInput()
        });
      } catch (err) {
        console.error('Error al convertir a timestamp', err);
      }
    }
  }

  asCurrent(res: any): any {
    return res;
  }

  asToDate(res: any): any {
    return res;
  }

  asToTimestamp(res: any): any {
    return res;
  }

  isToDateResponse(res: any): boolean {
    return res && 'date' in res && !('utc' in res);
  }

  isToDateFullResponse(res: any): boolean {
    return res && 'date' in res && 'utc' in res;
  }

  isToTimestampResponse(res: any): boolean {
    return res && 'timestamp' in res && !('iso' in res);
  }

  isCurrentResponse(res: any): boolean {
    return res && 'timestamp' in res && 'iso' in res;
  }

  async copyText(text: string | number): Promise<void> {
    try {
      await navigator.clipboard.writeText(String(text));
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
