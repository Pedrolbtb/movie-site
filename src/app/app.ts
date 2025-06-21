import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Moviedetails } from './components/moviedetails/moviedetails';
import { SearchDialog } from '../app/components/search-dialog/search-dialog/search-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Moviedetails],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'MovieSite';
}
