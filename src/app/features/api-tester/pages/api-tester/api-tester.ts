import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiTesterFacade } from '../../services/api-tester.facade';
import {
  HttpMethod,
  BodyType,
  HttpHeader,
  ApiTesterRequest,
  SaveRequestPayload
} from '@core/interfaces/tools.interface';

// Icons
import { Send } from '@primeicons/angular/send';
import { History } from '@primeicons/angular/history';
import { Plus } from '@primeicons/angular/plus';
import { Trash } from '@primeicons/angular/trash';
import { Check } from '@primeicons/angular/check';
import { Spinner } from '@primeicons/angular/spinner';
import { Save } from '@primeicons/angular/save';

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Send,
    History,
    Plus,
    Trash,
    Check,
    Spinner,
    Save,
  ],
  templateUrl: './api-tester.html',
  styleUrl: './api-tester.scss',
})
export class ApiTester implements OnInit {
  protected readonly facade = inject(ApiTesterFacade);

  // Form State
  url = signal<string>('https://jsonplaceholder.typicode.com/posts');
  method = signal<HttpMethod>('GET');
  bodyType = signal<BodyType>('none');
  body = signal<string>('');
  graphqlQuery = signal<string>('');
  graphqlVariables = signal<string>('');
  headers = signal<HttpHeader[]>([{ key: '', value: '' }]);
  timeout = signal<number>(30000);

  // Navigation / Tabs
  activeTab = signal<'headers' | 'body'>('headers');

  // Save Modal
  showSaveModal = signal<boolean>(false);
  saveName = signal<string>('');
  saveDescription = signal<string>('');

  ngOnInit(): void {
    this.facade.loadHistory();
    this.facade.loadCollections();
  }

  addHeader(): void {
    this.headers.update((list) => [...list, { key: '', value: '' }]);
  }

  removeHeader(index: number): void {
    this.headers.update((list) => list.filter((_, i) => i !== index));
    if (this.headers().length === 0) {
      this.headers.set([{ key: '', value: '' }]);
    }
  }

  setBodyType(type: BodyType): void {
    this.bodyType.set(type);
    if (type === 'json' && !this.body()) {
      this.body.set('{\n  "key": "value"\n}');
    } else if (type === 'graphql' && !this.graphqlQuery()) {
      this.graphqlQuery.set('query {\n  \n}');
      this.graphqlVariables.set('{\n  \n}');
    }
  }

  loadRequest(item: SaveRequestPayload): void {
    const req = item.request;
    this.url.set(req.url);
    this.method.set(req.method);
    this.bodyType.set(req.bodyType || 'none');
    this.body.set(req.body || '');
    this.timeout.set(req.timeout || 30000);
    
    if (req.graphql) {
      this.graphqlQuery.set(req.graphql.query || '');
      this.graphqlVariables.set(JSON.stringify(req.graphql.variables || {}, null, 2));
    } else {
      this.graphqlQuery.set('');
      this.graphqlVariables.set('');
    }

    if (req.headers && req.headers.length > 0) {
      this.headers.set([...req.headers]);
    } else {
      this.headers.set([{ key: '', value: '' }]);
    }
  }

  async sendRequest(): Promise<void> {
    if (!this.url()) return;

    // Filter empty headers
    const filteredHeaders = this.headers().filter((h) => h.key.trim() !== '');

    let gqlVariables: Record<string, unknown> | undefined;
    if (this.bodyType() === 'graphql' && this.graphqlVariables().trim()) {
      try {
        gqlVariables = JSON.parse(this.graphqlVariables());
      } catch {
        gqlVariables = {};
      }
    }

    const requestPayload: ApiTesterRequest = {
      method: this.method(),
      url: this.url(),
      headers: filteredHeaders,
      bodyType: this.bodyType(),
      body: this.bodyType() !== 'none' && this.bodyType() !== 'graphql' ? this.body() : undefined,
      graphql: this.bodyType() === 'graphql' ? {
        query: this.graphqlQuery(),
        variables: gqlVariables,
      } : undefined,
      timeout: this.timeout(),
    };

    try {
      await this.facade.execute(requestPayload);
    } catch {
      // Error is already handled by facade/signals
    }
  }

  openSaveModal(): void {
    this.saveName.set('');
    this.saveDescription.set('');
    this.showSaveModal.set(true);
  }

  closeSaveModal(): void {
    this.showSaveModal.set(false);
  }

  async saveCurrentRequest(): Promise<void> {
    if (!this.saveName().trim()) return;

    const filteredHeaders = this.headers().filter((h) => h.key.trim() !== '');
    let gqlVariables: Record<string, unknown> | undefined;
    if (this.bodyType() === 'graphql' && this.graphqlVariables().trim()) {
      try {
        gqlVariables = JSON.parse(this.graphqlVariables());
      } catch {
        gqlVariables = {};
      }
    }

    const payload: SaveRequestPayload = {
      name: this.saveName(),
      description: this.saveDescription(),
      request: {
        method: this.method(),
        url: this.url(),
        headers: filteredHeaders,
        bodyType: this.bodyType(),
        body: this.bodyType() !== 'none' && this.bodyType() !== 'graphql' ? this.body() : undefined,
        graphql: this.bodyType() === 'graphql' ? {
          query: this.graphqlQuery(),
          variables: gqlVariables,
        } : undefined,
        timeout: this.timeout(),
      },
    };

    try {
      await this.facade.save(payload);
      this.closeSaveModal();
    } catch {
      // Error is already handled by facade/signals
    }
  }

  async deleteHistory(id: string | undefined, event: Event): Promise<void> {
    event.stopPropagation();
    if (!id) return;
    await this.facade.deleteHistoryItem(id);
  }

  async clearHistory(): Promise<void> {
    if (confirm('¿Estás seguro de que deseas vaciar todo el historial de peticiones?')) {
      await this.facade.clearAllHistory();
    }
  }

  // Helpers
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getResponseString(): string {
    const res = this.facade.activeResponse();
    if (!res) return '';
    if (typeof res.data === 'object') {
      return JSON.stringify(res.data, null, 2);
    }
    return String(res.data);
  }
}
