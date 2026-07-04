import { inject, Injectable } from "@angular/core";
import { SnippetResultDto } from "@core/application/dto/snippet.dto";
import { SnippetMapper } from "@core/application/mappers/snippet.mapper";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class GetByIdSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    async getById(id: string): Promise<SnippetResultDto> {
        const result = await this.snippetRepository.getSnippetById(id);
        return SnippetMapper.toResultDto(result);
    }
}
