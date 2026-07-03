import { inject, Injectable } from "@angular/core";
import { ISnippetRepository } from "@core/domain/repositories/snippet.repositories.interface";

@Injectable({
  providedIn: 'root',
})
export class DeleteSnippetUseCase {
    private readonly snippetRepository = inject(ISnippetRepository);

    delete(id: string): Promise<void> {
        return this.snippetRepository.deleteSnippet(id);
    }
}
