import {
  ApiTesterRequest,
  ApiTesterResponse,
  SaveRequestPayload,
  CollectionPayload
} from '@core/interfaces/tools.interface';
import { SavedRequestEntity } from '@core/domain/entities/api-tester.entity';

export class ApiTesterMapper {
  static mapBodyTypeToBackend(type?: string): string {
    if (!type) return 'NONE';
    switch (type) {
      case 'none': return 'NONE';
      case 'json': return 'JSON';
      case 'form-data': return 'FORM_DATA';
      case 'x-www-form-urlencoded': return 'X_WWW_FORM_URLENCODED';
      case 'raw': return 'TEXT';
      case 'graphql': return 'GRAPHQL';
      default: return 'NONE';
    }
  }

  static mapBodyTypeToFrontend(type?: string): string {
    if (!type) return 'none';
    switch (type.toUpperCase()) {
      case 'NONE': return 'none';
      case 'JSON': return 'json';
      case 'FORM_DATA': return 'form-data';
      case 'X_WWW_FORM_URLENCODED': return 'x-www-form-urlencoded';
      case 'TEXT': return 'raw';
      case 'GRAPHQL': return 'graphql';
      default: return 'none';
    }
  }

  static toBackendRequest(req: ApiTesterRequest): any {
    return {
      ...req,
      bodyType: this.mapBodyTypeToBackend(req.bodyType),
    };
  }

  static toFrontendRequest(req: any): ApiTesterRequest {
    if (!req) return { method: 'GET', url: '' };
    return {
      ...req,
      bodyType: this.mapBodyTypeToFrontend(req.bodyType),
    };
  }

  static toBackendPayload(payload: SaveRequestPayload): any {
    return {
      ...payload,
      request: this.toBackendRequest(payload.request),
    };
  }

  static toFrontendPayload(payload: any): SaveRequestPayload {
    return {
      ...payload,
      request: this.toFrontendRequest(payload.request),
    };
  }

  static toDomainEntity(payload: any): SavedRequestEntity {
    return {
      id: payload.id,
      name: payload.name,
      description: payload.description,
      tags: payload.tags || [],
      request: {
        method: payload.request?.method || 'GET',
        url: payload.request?.url || '',
        headers: payload.request?.headers || [],
        bodyType: this.mapBodyTypeToFrontend(payload.request?.bodyType),
        body: payload.request?.body,
        graphql: payload.request?.graphql,
        timeout: payload.request?.timeout,
      },
      userId: payload.userId,
      createdAt: payload.createdAt ? new Date(payload.createdAt) : undefined,
    };
  }

  static toDomainEntityList(payloadList: any[]): SavedRequestEntity[] {
    return payloadList.map((p) => this.toDomainEntity(p));
  }
}
