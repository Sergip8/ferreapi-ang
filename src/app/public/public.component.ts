import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicHeaderComponent } from './layouts/public-header/public-header.component';
import { FooterComponent } from './layouts/public-footer/public-footer.component';

@Component({
  selector: 'app-public',
  standalone: false,
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {
  searchTerm: string = '';

  onSearch(term: string) {
    this.searchTerm = term;
  }
}
