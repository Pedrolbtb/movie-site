import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './search-dialog.html',
  styleUrls: ['./search-dialog.css']
})
export class SearchDialog implements OnInit {

  searchQuery: string = '';
  searchResults: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchDialog>
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.movieService.searchMovies(query))
    ).subscribe((results: any) => {
      this.searchResults = results.results;
      console.log('Search results:', this.searchResults);
    });
  }

  searchQueryChanged(query: string): void {
    if (query.length >= 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }

  selectMovie(movie: any): void {
    this.dialogRef.close();
    this.router.navigate(['/movies', movie.id]);
  }

  close(): void {
    this.dialogRef.close();
  }
}