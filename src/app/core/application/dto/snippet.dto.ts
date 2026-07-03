export interface SnippetDto {
    title: string;
    content: string;
    description: string;
    language: string;
    isPublic: boolean;
    tags: string[];
}

export interface SnippetUpdateDto {
    title: string;
    content: string;
    description: string;
    language: string;
    isPublic: boolean;
    tags: string[];
}

export interface SnippetResultDto {
    id: string;
    title: string;
    content: string;
    description: string;
    language: string;
    isPublic: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
}