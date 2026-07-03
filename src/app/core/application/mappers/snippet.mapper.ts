import { SnippetEntity } from '@core/domain/entities/snippet.entity';
import { SnippetResponse } from '@core/interfaces/snippets.interface';

export class SnippetMapper {
    static fromHttpResponse(response: SnippetResponse): SnippetEntity {
        return {
            id: response.id,
            title: response.title,
            description: response.description || '',
            content: response.content,
            language: response.language,
            tags: response.tags ?? [],
            createdAt: new Date(response.createdAt),
            updatedAt: new Date(response.updatedAt),
            isPublic: response.isPublic ?? false,
            user: response.userId ?? '',
        };
    }

    static fromHttpResponseList(responses: SnippetResponse[]): SnippetEntity[] {
        return responses.map((r) => this.fromHttpResponse(r));
    }

    /**
     * Convierte Entidad a DTO para crear/actualizar.
     */
    static toCreateRequest(snippet: SnippetEntity): {
        title: string;
        description: string;
        content: string;
        language: string;
        tags: string[];
        isPublic: boolean;
    } {
        return {
            title: snippet.title,
            description: snippet.description || '',
            content: snippet.content,
            language: snippet.language,
            tags: snippet.tags,
            isPublic: snippet.isPublic,
        };
    }
}