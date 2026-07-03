import { CreateSnippetRequest } from "./tools.interface";

export interface SnippetResponse extends CreateSnippetRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}