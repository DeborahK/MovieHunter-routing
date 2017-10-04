import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  pageTitle: string = 'Advanced Search';
  errorMessage: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(criteria): void {
    this.router.navigate(['/movies'], { queryParams: criteria });
  }
}
