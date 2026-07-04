import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { SnippetMapper } from "@core/application/mappers/snippet.mapper";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class SearchSnippetsUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async search(query: string): Promise<SnippetResultDto[]> {
        const list = await this.snippetRepository.getSearchSnippets(query);
        return SnippetMapper.toResultDtoList(list);
    }
}