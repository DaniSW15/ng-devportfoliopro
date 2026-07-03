import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { SnippetResponse } from '@core/interfaces/snippets.interface';
import { CreateSnippetRequest, UpdateSnippetRequest } from '@core/interfaces/tools.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SnippetHttpAdapter {
    private readonly http = inject(HttpClient)

    postSnippet(payload: CreateSnippetRequest): Observable<SnippetResponse> {
        return this.http.post<SnippetResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.CREATE}`, payload);
    }

    getSnippets(): Observable<SnippetResponse[]> {
        return this.http.get<SnippetResponse[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.LIST}`);
    }

    getSearchSnippets(query: string): Observable<SnippetResponse[]> {
        return this.http.get<SnippetResponse[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.SEARCH(query)}`);
    }

    getSnippetById(id: string): Observable<SnippetResponse> {
        return this.http.get<SnippetResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.DETAIL(id)}`);
    }

    updateSnippet(id: string, payload: UpdateSnippetRequest): Observable<SnippetResponse> {
        return this.http.put<SnippetResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.UPDATE(id)}`, payload);
    }

    deleteSnippet(id: string): Observable<void> {
        return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.SNIPPETS.DELETE(id)}`);
    }
}