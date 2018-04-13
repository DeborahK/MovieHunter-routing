import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { MovieParameterService } from './movie-parameter.service';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    pageTitle: string = 'Movie List';
    filteredMovies: IMovie[];
    movies: IMovie[];
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
        this.route.queryParams.subscribe(param => {
            this.pageTitle = 'Movie List';
            this.getMovies();
        });
    }

    getMovies(): void {
        this.movieService.getMovies()
            .subscribe(
                (movies: IMovie[]) => {
                    this.movies = this.performSearch(movies);
                    this.filteredMovies = this.performFilter(this.listFilter);
                },
                (error: any) => this.errorMessage = <any>error);
    }

    // Local filter
    performFilter(filterBy: string): IMovie[] {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.movies.filter((movie: IMovie) =>
                movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            return this.movies;
        }
    }

    // Advanced search
    performSearch(movies: IMovie[]): IMovie[] {
        const params = this.route.snapshot.queryParamMap;
        if (params.keys.length) {
            this.pageTitle = 'Movie List From Advanced Search';
            return movies.filter((movie: IMovie) =>
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
