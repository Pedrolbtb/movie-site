import { Component, OnInit, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
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
  loading = false;
  loadingUpcoming = false;
  currentPage = 1;
  movies: Movie[] = [];
  upmovies: Movie[] = [];
  totalItens = 0;
  pageSize = 10;
  currentSlide = 0; // índice do slide atual

  private isBrowser: boolean;

  constructor(
    private movieService: MovieService, 
    private route: ActivatedRoute,
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

  loadMovies(): void {
    if (this.loading) return;
    this.loading = true;
    this.cdr.detectChanges();

    this.movieService.getMovies(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalItens = response.total_results;
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

  prevSlide(): void {
    if (this.movies.length === 0) return;
    this.currentSlide = (this.currentSlide === 0) ? this.movies.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    if (this.movies.length === 0) return;
    this.currentSlide = (this.currentSlide === this.movies.length - 1) ? 0 : this.currentSlide + 1;
  }

onGenreSelected(genreId: number) {
  console.log('Gênero selecionado:', genreId);
  this.movieService.getMoviesByGenre(genreId).subscribe((res) => {
    this.movies = res.results;
  });

  this.movieService.getUpcomingMoviesByGenre(genreId).subscribe((res) => {
    this.upmovies = res.results;
  });
}
}
