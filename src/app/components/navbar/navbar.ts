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
    imports: [CommonModule, RouterModule, MatToolbarModule, MatDialogModule , MatButtonModule, MatIconModule, MatMenuModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
  })
  
export class Navbar {
  currentLang: string;

  constructor(private dialog: MatDialog, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentLang = localStorage.getItem('lang') || 'pt-BR';
    } else {
      this.currentLang = 'pt-BR'; 
    }
  }

  openSearch() {
    this.dialog.open(SearchDialog, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }

  switchLanguage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentLang = this.currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
      localStorage.setItem('lang', this.currentLang);
      window.location.reload();
    }
  }
}


