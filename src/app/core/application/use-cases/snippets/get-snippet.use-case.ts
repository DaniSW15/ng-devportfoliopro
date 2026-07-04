import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { SnippetMapper } from "@core/application/mappers/snippet.mapper";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class GetSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async execute(): Promise<SnippetResultDto[]> {
        const list = await this.snippetRepository.getSnippets();
        return SnippetMapper.toResultDtoList(list);
    }
}
