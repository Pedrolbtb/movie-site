import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actorlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actorlist.html',
  styleUrls: ['./actorlist.css']
})
export class Actorlist implements OnInit, OnDestroy {
  @Input() movieId!: number;
  cast: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    if (!this.movieId) return;

    this.movieService.getMovieCredits(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (credits) => {
          this.cast = credits.cast;
        },
        error: (err) => {
          console.error('Erro ao carregar elenco:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}