export interface SnippetEntity {
    id: string;
    title: string;
    content: string;
    language: string;
    description?: string;
    isPublic: boolean;
    tags: string[];
    user: string;
    createdAt: Date;
    updatedAt: Date;
}