import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel {
  @Input() movies: Movie[] = [];
  @Input() currentSlide = 0;
  @Output() slideChange = new EventEmitter<number>();

  prevSlide(): void {
    if (this.movies.length === 0) return;
    const prev = this.currentSlide === 0 ? this.movies.length - 1 : this.currentSlide - 1;
    this.slideChange.emit(prev);
  }

  nextSlide(): void {
    if (this.movies.length === 0) return;
    const next = this.currentSlide === this.movies.length - 1 ? 0 : this.currentSlide + 1;
    this.slideChange.emit(next);
  }
}
