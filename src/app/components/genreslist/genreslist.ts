import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-genreslist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './genreslist.html',
  styleUrls: ['./genreslist.css']
})
export class Genreslist implements OnInit {

  genres: { id: number; name: string }[] = [];
  selectedGenreId: number | null = null;

  @Output() genreSelected = new EventEmitter<number|null>();

  constructor(
    private movieService: MovieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres()
      .subscribe({
        next: (response) => {
          this.genres = response.genres;
        },
        error: (err) => {
          console.error('Erro ao carregar gêneros:', err);
        }
      });
  }

onGenreClick(id: number, event: Event) {
  if (this.selectedGenreId === id) {
    this.selectedGenreId = null;
    this.genreSelected.emit(null); 
    (event.target as HTMLButtonElement).blur();
  } else {
    this.selectedGenreId = id;
    this.genreSelected.emit(id);
  }
}

  get titleGeneros(): string {
    let lang = 'pt-BR';
    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('lang') || 'pt-BR';
    }
    return lang === 'en-US' ? 'Genres' : 'Gêneros';
  }
}