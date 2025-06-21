import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MovieCredits } from '../models/movie.interface';

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
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR'
      }
    }).pipe(
    );
  }
  
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        page: page.toString(),
        language: 'pt-BR'
      }
    }).pipe(
    );
  }

  getUpcomingMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: 'pt-BR'
      }
    }).pipe(
    );
  }

getMovieCredits(movieId: number): Observable<MovieCredits> {
  return this.http.get<MovieCredits>(

    `${this.apiUrl}/movie/${movieId}/credits`,
    {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR'
      }
    }
  );
}

getGenres() {
  return this.http.get<{ genres: { id: number; name: string }[] }>(
    `${this.apiUrl}/genre/movie/list`,
    {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR'
      }
    }
  );
}

getMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
    params: {
      api_key: this.apiKey,
      with_genres: genreId.toString(),
      page: page.toString(),
      language: 'pt-BR'
    }
  });
}

getUpcomingMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
    params: {
      api_key: this.apiKey,
      with_genres: genreId.toString(),
      sort_by: 'release_date.asc',
      page: page.toString(),
      language: 'pt-BR',
      'primary_release_date.gte': new Date().toISOString().split('T')[0]
    }
  });
}



}
