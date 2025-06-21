import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies/movies';
import { Moviedetails } from './components/moviedetails/moviedetails';

export const routes: Routes = [
    {
        path: '',
        component: Movies
    },
    {
        path: 'movies/:id',
        component: Moviedetails
    }
    
];
