import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchDialog } from '../search-dialog/search-dialog/search-dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatDialogModule , MatButtonModule,  SearchDialog, MatIconModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {


constructor(private dialog: MatDialog, private router: Router) {}
openSearch() {
  console.log('Opening search dialog');
  this.dialog.open(SearchDialog,{
    width: '600px',
    maxWidth: '90vw',
    maxHeight: '90vh',
  });
}
}

