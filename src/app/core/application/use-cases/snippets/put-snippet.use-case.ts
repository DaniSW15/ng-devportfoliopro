import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";
import { UpdateSnippetRequest } from "@core/interfaces/tools.interface";

@Injectable({
    providedIn: 'root',
})
export class PutSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async execute(id: string, data: UpdateSnippetRequest): Promise<SnippetResultDto> {
        if (!id?.trim()) {
            throw new Error('ID de snippet es requerido');
        }

        const input = {
            title: data.title,
            content: data.content,
            language: data.language,
            description: data.description,
            isPublic: data.isPublic ?? false,
            tags: data.tags ?? [],
        };

        const result = await this.snippetRepository.updateSnippet(id, input);

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
