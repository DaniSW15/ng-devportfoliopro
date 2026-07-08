import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { UuidVersion, UuidSingleResponse, UuidBulkResponse } from '@core/interfaces/tools.interface';

/** Tipo unión de las respuestas posibles del signal de UUID */
type UuidResult = UuidSingleResponse | UuidBulkResponse | null;
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-uuid-generator',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, CheckboxModule, RouterModule],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss',
})
export class UuidGenerator implements OnInit {
  protected readonly toolFacade = inject(ToolFacade);
  readonly Number = Number;

  ngOnInit(): void {
    this.toolFacade.clearState();
  }

  readonly uuidVersion = signal<UuidVersion>('v4');
  readonly isBulk = signal<boolean>(false);
  readonly bulkCount = signal<number>(5);

  readonly copiedIndex = signal<number | null>(null);
  readonly copiedAll = signal<boolean>(false);

  async onGenerate(): Promise<void> {
    try {
      if (this.isBulk()) {
        await this.toolFacade.generateUuidBulk(this.bulkCount(), this.uuidVersion());
      } else {
        await this.toolFacade.generateUuid(this.uuidVersion());
      }
    } catch (err) {
      console.error('Error al generar UUIDs', err);
    }
  }

  // ── Type Guards tipados ──

  isBulkResponse(res: UuidResult): res is UuidBulkResponse {
    return res != null && 'uuids' in res;
  }

  isSingleResponse(res: UuidResult): res is UuidSingleResponse {
    return res != null && 'uuid' in res;
  }

  asBulk(result: UuidResult): UuidBulkResponse {
    return result as UuidBulkResponse;
  }

  asSingle(result: UuidResult): UuidSingleResponse {
    return result as UuidSingleResponse;
  }

  async copySingle(uuid: string, index: number): Promise<void> {
    try {
      await navigator.clipboard.writeText(uuid);
      this.copiedIndex.set(index);
      setTimeout(() => {
        if (this.copiedIndex() === index) {
          this.copiedIndex.set(null);
        }
      }, 1500);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }

  async copyAll(uuids: string[]): Promise<void> {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      this.copiedAll.set(true);
      setTimeout(() => this.copiedAll.set(false), 1500);
    } catch (err) {
      console.error('Error al copiar todos', err);
    }
  }
}
