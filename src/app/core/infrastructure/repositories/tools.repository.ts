import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import { ToolsHttpAdapter } from '../adapters/http/tools.http-adapter';
import {
  PasswordGeneratorRequest,
  PasswordGeneratorResponse,
  JwtDecodeRequest,
  JwtDecodeResponse,
  JsonFormatterRequest,
  JsonFormatterResponse
} from '@core/interfaces/tools.interface';

@Injectable()
export class ToolsRepository implements IToolsRepository {
  private readonly httpAdapter = inject(ToolsHttpAdapter);

  async generatePassword(request: PasswordGeneratorRequest): Promise<PasswordGeneratorResponse> {
    return firstValueFrom(this.httpAdapter.generatePassword(request));
  }

  async decodeJwt(request: JwtDecodeRequest): Promise<JwtDecodeResponse> {
    return firstValueFrom(this.httpAdapter.decodeJwt(request));
  }

  async formatJson(request: JsonFormatterRequest): Promise<JsonFormatterResponse> {
    return firstValueFrom(this.httpAdapter.formatJson(request));
  }
}