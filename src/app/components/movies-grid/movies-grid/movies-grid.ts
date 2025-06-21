import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-movies-grid',
  imports: [CommonModule, RouterModule, MatCardModule, MatIcon],
  templateUrl: './movies-grid.html',
  styleUrls: ['./movies-grid.css']
})
export class MoviesGrid {
  @Input() movies: Movie[] = [];
  @Input() title: string = '';

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

scrollLeft(): void {
  this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight(): void {
  this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
}

}


