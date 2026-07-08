import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';
import {
  TimestampCurrentResponse,
  TimestampToDateResponse,
  DateToTimestampResponse
} from '@core/interfaces/tools.interface';

/** Tipo unión de todas las respuestas posibles del signal de timestamp */
type TimestampResult = TimestampToDateResponse | DateToTimestampResponse | TimestampCurrentResponse | null;

@Component({
  selector: 'app-timestamp-converter',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, RouterModule],
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
      if (current && this.isCurrentResponse(current)) {
        this.timestampInput.set(String(current.timestamp));
        this.dateInput.set(current.iso);
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

  // ── Type Guards tipados ──

  asCurrent(res: TimestampResult): TimestampCurrentResponse {
    return res as TimestampCurrentResponse;
  }

  asToDate(res: TimestampResult): TimestampToDateResponse {
    return res as TimestampToDateResponse;
  }

  asToTimestamp(res: TimestampResult): DateToTimestampResponse {
    return res as DateToTimestampResponse;
  }

  isToDateResponse(res: TimestampResult): res is TimestampToDateResponse {
    return res != null && 'date' in res && !('utc' in res);
  }

  isToDateFullResponse(res: TimestampResult): res is TimestampToDateResponse {
    return res != null && 'date' in res && 'utc' in res;
  }

  isToTimestampResponse(res: TimestampResult): res is DateToTimestampResponse {
    return res != null && 'timestamp' in res && !('iso' in res);
  }

  isCurrentResponse(res: TimestampResult): res is TimestampCurrentResponse {
    return res != null && 'timestamp' in res && 'iso' in res;
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

