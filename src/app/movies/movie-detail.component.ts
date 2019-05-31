import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  pageTitle = 'Movie Detail';
  movie: Movie;
  errorMessage: string;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const dataName = 'movie';
    this.movie = this.route.snapshot.data[dataName];
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
