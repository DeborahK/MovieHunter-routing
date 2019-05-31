import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieParameterService } from './movie-parameter.service';

@Component({
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle = 'Movie List';
  filteredMovies: Movie[];
  movies: Movie[];
  errorMessage: string;

  get listFilter(): string {
    return this.movieParameterService.filterBy;
  }
  set listFilter(value: string) {
    this.movieParameterService.filterBy = value;
    this.filteredMovies = this.performFilter(this.listFilter);
  }

  get showImage(): boolean {
    return this.movieParameterService.displayPosters;
  }
  set showImage(value: boolean) {
    this.movieParameterService.displayPosters = value;
  }

  constructor(private movieService: MovieService,
              private movieParameterService: MovieParameterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = 'Movie List';
      // If parameters are passed in,
      // clear any existing filter
      if (Object.keys(params).length) {
        this.listFilter = null;
      }
      this.getMovies();
    });
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(
        (movies: Movie[]) => {
          this.movies = this.performSearch(movies);
          this.filteredMovies = this.performFilter(this.listFilter);
        },
        (error: any) => this.errorMessage = error
      );
  }

  // Local filter
  performFilter(filterBy: string): Movie[] {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.movies.filter((movie: Movie) =>
        movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      return this.movies;
    }
  }

  // Advanced search
  performSearch(movies: Movie[]): Movie[] {
    const params = this.route.snapshot.queryParamMap;
    if (params.keys.length) {
      this.pageTitle = 'Movie List From Advanced Search';
      return movies.filter((movie: Movie) =>
        (params.get('title') ?
          movie.title.toLocaleLowerCase().indexOf(params.get('title').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('director') ?
          movie.director.toLocaleLowerCase().indexOf(params.get('director').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('description') ?
          movie.description.toLocaleLowerCase().indexOf(params.get('description').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('minStarRating') ? movie.starRating >= +params.get('minStarRating') : true) &&
        (params.get('maxStarRating') ? movie.starRating <= +params.get('maxStarRating') : true)
      );
    }
    return movies;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
