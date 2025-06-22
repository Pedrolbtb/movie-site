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
import { Subject, forkJoin, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
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
      switchMap(query => this.combinedSearch(query))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  searchQueryChanged(query: string): void {
    if (query.length >= 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }

private combinedSearch(query: string) {
  const aggregatedResults: any[] = [];

  return forkJoin([
    this.movieService.searchMovies(query),
    this.movieService.searchPerson(query),
    this.movieService.getGenres()
  ]).pipe(
    switchMap(([moviesRes, peopleRes, genresRes]) => {
      aggregatedResults.push(...(moviesRes.results || []));

      let personSearch$ = of([]);
      if (peopleRes.results?.length > 0) {
        const person = peopleRes.results[0];
        personSearch$ = this.movieService.getPersonMovieCredits(person.id).pipe(
          map(credits => credits.cast || [])
        );
      }

      let genreSearch$ = of([]);
      const matchedGenre = genresRes.genres.find((g: any) =>
        g.name.toLowerCase() === query.toLowerCase()
      );
      if (matchedGenre) {
        genreSearch$ = this.movieService.discoverByGenre(String(matchedGenre.id)).pipe(
          map(data => data.results || [])
        );
      }

      const year = parseInt(query, 10);
      let yearSearch$ = of([]);
      if (!isNaN(year) && query.length === 4) {
        yearSearch$ = this.movieService.discoverByYear(year).pipe(
          map(data => data.results || [])
        );
      }

      return forkJoin([personSearch$, genreSearch$, yearSearch$]);
    }),
    map(([personResults, genreResults, yearResults]) => {
      return [...aggregatedResults, ...personResults, ...genreResults, ...yearResults];
    })
  );
}



  selectMovie(movie: any): void {
    this.dialogRef.close();
    this.router.navigate(['/movies', movie.id]);
  }

  close(): void {
    this.dialogRef.close();
  }
}
