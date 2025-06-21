import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = 'd2769e979ed6fc6c2e7f795344862213';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: 'pt-BR'
      }
    }).pipe(
      tap(response => console.log('[MovieService] getMovies response:', response))
    );
  }

  getMovieDetails(id: number): Observable<any> {
    console.log(`[MovieService] getMovieDetails called with id = ${id}`);
    return this.http.get<any>(`${this.apiUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR'
      }
    }).pipe(
      tap(response => console.log('[MovieService] getMovieDetails response:', response))
    );
  }
  
  searchMovies(query: string, page: number = 1): Observable<any> {
    console.log(`[MovieService] searchMovies called with query = "${query}", page = ${page}`);
    return this.http.get<any>(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        page: page.toString(),
        language: 'pt-BR'
      }
    }).pipe(
      tap(response => console.log('[MovieService] searchMovies response:', response))
    );
  }

  getUpcomingMovies(page: number = 1): Observable<any> {
    console.log(`[MovieService] getUpcomingMovies called with page = ${page}`);
    return this.http.get<any>(`${this.apiUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: 'pt-BR'
      }
    }).pipe(
      tap(response => console.log('[MovieService] getUpcomingMovies response:', response))
    );
  }
}
