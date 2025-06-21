import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../models/movie.interface';
import { MovieService } from '../services/movie';
import { Actorlist } from '../actorlist/actorlist';

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
    Actorlist
  ],
  templateUrl: './moviedetails.html',
  styleUrls: ['./moviedetails.css']
})
export class Moviedetails implements OnInit {
  movie?: Movie;
  loading: boolean = false;
  genresList: string = '';

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadMovieDetails(id);
    });
  }

  loadMovieDetails(id: number): void {
    this.loading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;

this.genresList = this.movie!.genres.map(g => g.name).join(', ');


        this.loading = false;
        this.cdr.detectChanges();  
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
