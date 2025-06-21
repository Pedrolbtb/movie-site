import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() genreSelected = new EventEmitter<number>();

  constructor(private movieService: MovieService) {}

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

  onGenreClick(id: number) {
    this.genreSelected.emit(id);
  }
}
