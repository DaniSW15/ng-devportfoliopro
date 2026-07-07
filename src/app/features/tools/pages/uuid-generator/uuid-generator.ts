import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolFacade } from '../../service/tool.facade';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { UuidVersion } from '@core/interfaces/tools.interface';

@Component({
  selector: 'app-uuid-generator',
  imports: [CommonModule, FormsModule, ButtonModule, MessageModule, CheckboxModule],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss',
})
export class UuidGenerator {
  protected readonly toolFacade = inject(ToolFacade);
  readonly Number = Number;

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

  isBulkResponse(res: any): boolean {
    return res && 'uuids' in res;
  }

  isSingleResponse(res: any): boolean {
    return res && 'uuid' in res;
  }

  asBulk(result: any): any {
    return result;
  }

  asSingle(result: any): any {
    return result;
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
