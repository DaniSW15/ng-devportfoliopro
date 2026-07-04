import { SnippetEntity } from '@core/domain/entities/snippet.entity';
import { SnippetResultDto } from '@core/application/dto/snippet.dto';
import { SnippetResponse } from '@core/interfaces/snippets.interface';
import { CreateSnippetRequest } from '@core/interfaces/tools.interface';

export class SnippetMapper {
    /**
     * Convierte respuesta HTTP del Backend a Entidad de Dominio.
     */
    static fromHttpResponse(response: SnippetResponse): SnippetEntity {
        return {
            id: response.id,
            title: response.title,
            description: response.description || '',
            content: response.content,
            language: response.language,
            tags: response.tags ?? [],
            isPublic: response.isPublic ?? false,
            user: response.userId,
            createdAt: new Date(response.createdAt),
            updatedAt: new Date(response.updatedAt),
        };
    }

    static fromHttpResponseList(responses: SnippetResponse[]): SnippetEntity[] {
        return responses.map((r) => this.fromHttpResponse(r));
    }

    /**
     * Convierte Entidad de Dominio a DTO de Aplicación (UI).
     */
    static toResultDto(entity: SnippetEntity): SnippetResultDto {
        return {
            id: entity.id,
            title: entity.title,
            content: entity.content,
            description: entity.description || '',
            language: entity.language,
            isPublic: entity.isPublic,
            tags: entity.tags,
            createdAt: entity.createdAt.toISOString(),
            updatedAt: entity.updatedAt.toISOString(),
            userId: entity.user,
        };
    }

    static toResultDtoList(entities: SnippetEntity[]): SnippetResultDto[] {
        return entities.map((e) => this.toResultDto(e));
    }

    /**
     * Convierte Entidad a Request HTTP Payload para crear.
     */
    static toCreateRequest(entity: SnippetEntity): CreateSnippetRequest {
        return {
            title: entity.title,
            description: entity.description || '',
            content: entity.content,
            language: entity.language,
            tags: entity.tags,
            isPublic: entity.isPublic,
        };
    }
}