import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class GetSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async execute(): Promise<SnippetResultDto[]> {
        const list = await this.snippetRepository.getSnippets();
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
