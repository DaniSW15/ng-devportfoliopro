import { inject, Injectable } from "@angular/core";
import { SnippetDto, SnippetResultDto } from "@core/application/dto/snippet.dto";
import { SnippetMapper } from "@core/application/mappers/snippet.mapper";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
    providedIn: 'root',
})
export class CreateSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async create(payload: SnippetDto): Promise<SnippetResultDto> {
        const result = await this.snippetRepository.postSnippet(payload);
        return SnippetMapper.toResultDto(result);
    }
}