import { SnippetEntity } from '../entities/snippet.entity';

export interface CreateSnippetInput {
    title: string;
    content: string;
    language: string;
    description?: string;
    isPublic: boolean;
    tags: string[];
}

export interface UpdateSnippetInput extends Partial<CreateSnippetInput> { }

export abstract class ISnippetRepository {
    abstract postSnippet(payload: CreateSnippetInput): Promise<SnippetEntity>;
    abstract getSnippets(): Promise<SnippetEntity[]>;
    abstract getSearchSnippets(query: string): Promise<SnippetEntity[]>;
    abstract getSnippetById(id: string): Promise<SnippetEntity>;
    abstract updateSnippet(id: string, payload: UpdateSnippetInput): Promise<SnippetEntity>;
    abstract deleteSnippet(id: string): Promise<void>;
}