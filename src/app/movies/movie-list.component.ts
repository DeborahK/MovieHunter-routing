import { Component, OnInit } from '@angular/core';

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
                private movieParameterService: MovieParameterService) { }

    ngOnInit(): void { this.getMovies(); }

    getMovies(): void {
        this.movieService.getMovies()
            .subscribe(
                (movies: IMovie[]) => {
                    this.movies = movies;
                    this.filteredMovies = this.performFilter(this.listFilter);
                },
                (error: any) => this.errorMessage = <any>error);
    }

    performFilter(filterBy: string): IMovie[] {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.movies.filter((movie: IMovie) =>
                movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            return this.movies;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
