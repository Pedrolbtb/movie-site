import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../models/movie.interface';
import { MovieService } from '../services/movie';

@Component({
  standalone: true,
  selector: 'app-moviedetails',
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    MatChipsModule, 
    MatPaginatorModule,
  ],
  templateUrl: './moviedetails.html',
  styleUrls: ['./moviedetails.css']
})
export class Moviedetails implements OnInit {
  movie?: Movie;
  loading: boolean = true;
  genresList: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe({
        next: (data) => {
          this.movie = data;
          this.genresList = data.genres.map((g: any) => g.name).join(', ');
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes do filme:', err);
          this.loading = false;
        }
      });
    }
  }

  get titleSinopse(): string {
    let lang = 'pt-BR';
    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('lang') || 'pt-BR';
    }
    return lang === 'en-US' ? 'Synopsis' : 'Sinopse';
  }

  get titleNota(): string {
    let lang = 'pt-BR';
    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('lang') || 'pt-BR';
    }
    return lang === 'en-US' ? 'Rating' : 'Nota';
  }

  get titleDataLancamento(): string {
    let lang = 'pt-BR';
    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('lang') || 'pt-BR';
    }
    return lang === 'en-US' ? 'Release date' : 'Data de lançamento';
  }
}
