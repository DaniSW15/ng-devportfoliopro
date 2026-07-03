import { inject, Injectable } from "@angular/core";
import { SnippetDto, SnippetResultDto } from "@core/application/dto/snippet.dto";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
    providedIn: 'root',
})
export class CreateSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async create(payload: SnippetDto): Promise<SnippetResultDto> {
        const result = await this.snippetRepository.postSnippet(payload);
        return {
            id: result.id,
            title: result.title,
            content: result.content,
            description: result.description || '',
            language: result.language,
            isPublic: result.isPublic,
            tags: result.tags,
            createdAt: result.createdAt.toISOString(),
            updatedAt: result.updatedAt.toISOString(),
            userId: result.user,
        };
    }
}