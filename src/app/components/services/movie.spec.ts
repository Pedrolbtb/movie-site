import { TestBed } from '@angular/core/testing';
import { MovieService } from '../services/movie';
import { provideHttpClient } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});