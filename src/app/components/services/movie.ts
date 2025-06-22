import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieCredits } from '../models/movie.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = 'd2769e979ed6fc6c2e7f795344862213';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get language() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('lang') || 'pt-BR';
    }
    return 'pt-BR';
  }

  getMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: this.language
      }
    });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        language: this.language
      }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        page: page.toString(),
        language: this.language
      }
    });
  }

  getUpcomingMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: this.language
      }
    });
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(
      `${this.apiUrl}/movie/${movieId}/credits`,
      {
        params: {
          api_key: this.apiKey,
          language: this.language
        }
      }
    );
  }

  getGenres(): Observable<{ genres: { id: number; name: string }[] }> {
    return this.http.get<{ genres: { id: number; name: string }[] }>(
      `${this.apiUrl}/genre/movie/list`,
      {
        params: {
          api_key: this.apiKey,
          language: this.language
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
        language: this.language
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
        language: this.language,
        'primary_release_date.gte': new Date().toISOString().split('T')[0]
      }
    });
  }

  searchPerson(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/person`, {
      params: {
        api_key: this.apiKey,
        query,
        language: this.language
      }
    });
  }

  discoverByGenre(genreId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        with_genres: genreId,
        language: this.language
      }
    });
  }

  getPersonMovieCredits(personId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/person/${personId}/movie_credits`, {
      params: {
        api_key: this.apiKey,
        language: this.language
      }
    });
  }

  discoverByYear(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        primary_release_year: year,
        sort_by: 'popularity.desc',
        language: this.language
      }
    });
  }
}