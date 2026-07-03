import { inject, Injectable } from "@angular/core";
import { SnippetHttpAdapter } from "../adapters/http/snippets.http-adapter";
import { firstValueFrom } from "rxjs";
import { ISnippetRepository, CreateSnippetInput, UpdateSnippetInput } from "@core/domain/repositories/snippet.repositories.interface";
import { SnippetEntity } from "@core/domain/entities/snippet.entity";
import { SnippetMapper } from "@core/application/mappers/snippet.mapper";

@Injectable()
export class SnippetRepository implements ISnippetRepository {
    private readonly httpAdapter = inject(SnippetHttpAdapter);
    
    async postSnippet(payload: CreateSnippetInput): Promise<SnippetEntity> {
        const response = await firstValueFrom(this.httpAdapter.postSnippet({
            title: payload.title,
            content: payload.content,
            language: payload.language,
            description: payload.description,
            isPublic: payload.isPublic,
            tags: payload.tags
        }));
        return SnippetMapper.fromHttpResponse(response);
    }

    async getSnippets(): Promise<SnippetEntity[]> {
        const response = await firstValueFrom(this.httpAdapter.getSnippets());
        return SnippetMapper.fromHttpResponseList(response);
    }

    async getSearchSnippets(query: string): Promise<SnippetEntity[]> {
        const response = await firstValueFrom(this.httpAdapter.getSearchSnippets(query));
        return SnippetMapper.fromHttpResponseList(response);
    }

    async getSnippetById(id: string): Promise<SnippetEntity> {
        const response = await firstValueFrom(this.httpAdapter.getSnippetById(id));
        return SnippetMapper.fromHttpResponse(response);
    }

    async updateSnippet(id: string, payload: UpdateSnippetInput): Promise<SnippetEntity> {
        const response = await firstValueFrom(this.httpAdapter.updateSnippet(id, {
            title: payload.title,
            content: payload.content,
            language: payload.language,
            description: payload.description,
            isPublic: payload.isPublic,
            tags: payload.tags
        }));
        return SnippetMapper.fromHttpResponse(response);
    }

    async deleteSnippet(id: string): Promise<void> {
        await firstValueFrom(this.httpAdapter.deleteSnippet(id));
    }
}