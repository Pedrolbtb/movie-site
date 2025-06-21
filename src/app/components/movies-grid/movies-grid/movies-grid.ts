import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-movies-grid',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './movies-grid.html',
  styleUrls: ['./movies-grid.css']
})
export class MoviesGrid {
  @Input() movies: Movie[] = [];
}
