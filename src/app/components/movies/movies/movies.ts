import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie';

import { MoviesGrid } from '../../movies-grid/movies-grid/movies-grid';
import { Navbar } from '../../navbar/navbar';
import { Carousel } from '../../carousel/carousel';
import { Genreslist } from '../../genreslist/genreslist';

@Component({
  standalone: true,
  selector: 'app-movies',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MoviesGrid,
    Navbar,
    Carousel,
    Genreslist
  ],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private isBrowser: boolean;

  loading = false;
  loadingUpcoming = false;
  currentPage = 1;
  currentSlide = 0;

  movies: Movie[] = [];
  upmovies: Movie[] = [];
  totalItens = 0;
  pageSize = 10;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadMovies();
    this.loadUpcomingMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMovies(page: number = 1): void {
    if (this.loading) return;
    this.loading = true;

    this.movieService.getMovies(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalItens = response.total_results;
          this.currentPage = page;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  loadUpcomingMovies(): void {
    this.loadingUpcoming = true;
    this.movieService.getUpcomingMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.upmovies = data.results;
          this.loadingUpcoming = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.loadingUpcoming = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSlideChanged(newIndex: number): void {
    this.currentSlide = newIndex;
    this.cdr.markForCheck();
  }

  prevSlide(): void {
    if (this.movies.length === 0) return;
    this.currentSlide = (this.currentSlide === 0) ? this.movies.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    if (this.movies.length === 0) return;
    this.currentSlide = (this.currentSlide === this.movies.length - 1) ? 0 : this.currentSlide + 1;
  }

  onGenreSelected(genreId: number | null): void {
    if (genreId === null) {
      this.currentPage = 1;
      this.loadMovies();
      this.loadUpcomingMovies();
      return;
    }

    this.currentPage = 1;
    this.loading = true;
    this.loadingUpcoming = true;

    this.movieService.getMoviesByGenre(genreId, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.movies = res.results;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    this.movieService.getUpcomingMoviesByGenre(genreId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.upmovies = res.results;
          this.loadingUpcoming = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loadingUpcoming = false;
          this.cdr.detectChanges();
        }
      });
  }

  loadMoreMovies(): void {
    if (this.loading) return;
    this.loading = true;
    this.currentPage++;

    this.movieService.getMovies(this.currentPage)
      .subscribe({
        next: (res) => {
          this.movies = [...this.movies, ...res.results];
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
  }

  get titleFilmesEmAlta(): string {
    if (this.isBrowser) {
      const lang = localStorage.getItem('lang') || 'pt-BR';
      return lang === 'en-US' ? 'Trending Movies' : 'Filmes em alta';
    }
    return 'Filmes em alta';
  }

  get titleProximosLancamentos(): string {
    if (this.isBrowser) {
      const lang = localStorage.getItem('lang') || 'pt-BR';
      return lang === 'en-US' ? 'Upcoming Releases' : 'Próximos lançamentos';
    }
    return 'Próximos lançamentos';
  }

  hasMovies(arr?: Movie[]): boolean {
    return Array.isArray(arr) && arr.length > 0;
  }
}
