import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class SearchSnippetsUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async search(query: string): Promise<SnippetResultDto[]> {
        const list = await this.snippetRepository.getSearchSnippets(query);
        return list.map(item => ({
            id: item.id,
            title: item.title,
            content: item.content,
            description: item.description || '',
            language: item.language,
            isPublic: item.isPublic,
            tags: item.tags,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
            userId: item.user,
        }));
    }
}