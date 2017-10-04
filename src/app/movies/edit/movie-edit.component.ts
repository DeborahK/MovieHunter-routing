import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
    templateUrl: './movie-edit.component.html',
    styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = 'Movie Edit';
    errorMessage: string;

    private currentMovie: IMovie;
    private originalMovie: IMovie;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalMovie) !== JSON.stringify(this.currentMovie);
    }

    get movie(): IMovie {
        return this.currentMovie;
    }
    set movie(value: IMovie) {
        this.currentMovie = value;
        // Clone the object to retain a copy
        this.originalMovie = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
                private router: Router,
                private movieService: MovieService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
            this.onMovieRetrieved(data['movie']);
        });
    }

    onMovieRetrieved(movie: IMovie): void {
        this.movie = movie;

        // Adjust the title
        if (this.movie.id === 0) {
            this.pageTitle = 'Add Movie';
        } else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }
    }

    deleteMovie(): void {
        if (this.movie.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.movie.title} was deleted`);
        } else {
            if (confirm(`Really delete the movie: ${this.movie.title}?`)) {
                this.movieService.deleteMovie(this.movie.id).subscribe(
                    () => this.onSaveComplete(`${this.movie.title} was deleted`)
                );
            }
        }
    }

    isValid(path?: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    saveMovie(): void {
        if (this.isValid()) {
            this.movieService.saveMovie(this.movie).subscribe(
                () => this.onSaveComplete(`${this.movie.title} was saved`)
            );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        console.log(message);
        this.reset();
        // Navigate back to the movie list
        this.router.navigate(['/movies']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentMovie = null;
        this.originalMovie = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.movie.title &&
            this.movie.title.length >= 3 &&
            this.movie.title.length <= 50 &&
            this.movie.director &&
            this.movie.director.length >= 5 &&
            this.movie.director.length <= 50 &&
            (!this.movie.starRating ||
              this.movie.starRating >= 1 &&
              this.movie.starRating <= 5)
            ) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.movie.category &&
            this.movie.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
