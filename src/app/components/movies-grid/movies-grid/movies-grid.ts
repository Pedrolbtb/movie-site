import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie';

@Component({
  standalone: true,
  selector: 'app-movies-grid',
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './movies-grid.html',
  styleUrls: ['./movies-grid.css']
})
export class MoviesGrid implements AfterViewInit, OnChanges {
  @Input() movies: Movie[] = [];
  @Input() title: string = '';
  @Input() loadMoreOnScroll: boolean = false;
  @Input() genreId?: number;

  @Output() loadMore = new EventEmitter<number>();

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  currentPage = 1;
  isLoading = false;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.loadMoreOnScroll && this.movies.length === 0) {
      this.loadMovies(this.currentPage);
    }

    if (this.loadMoreOnScroll && this.carousel) {
      this.carousel.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genreId'] && !changes['genreId'].isFirstChange()) {
      this.currentPage = 1;
      this.movies = [];
      if (this.loadMoreOnScroll) {
        this.loadMovies(this.currentPage);
      }
    }
  }

  scrollLeft(): void {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    const el = this.carousel.nativeElement;
    el.scrollBy({ left: 300, behavior: 'smooth' });
    this.checkScrollEnd();
  }

  onScroll(): void {
    this.checkScrollEnd();
  }

  private checkScrollEnd(): void {
    const el = this.carousel.nativeElement;
    const nearEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth - 300;

    if (this.loadMoreOnScroll && nearEnd && !this.isLoading) {
      this.currentPage++;
      this.loadMovies(this.currentPage);
    }
  }

  loadMovies(page: number): void {
    if (this.isLoading) return;
    this.isLoading = true;

    const request$ = this.genreId != null
      ? this.movieService.getMoviesByGenre(this.genreId, page)
      : this.movieService.getMovies(page);

    request$.subscribe({
      next: (res) => {
        this.movies = [...this.movies, ...res.results];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar mais filmes:', err);
        this.isLoading = false;
      }
    });
  }
}
