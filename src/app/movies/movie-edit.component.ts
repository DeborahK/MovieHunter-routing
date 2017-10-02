import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { RangeValidatorDirective } from '../shared/range.directive';

@Component({
    templateUrl: './movie-edit.component.html'
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
    movie: IMovie;
    errorMessage: string;

    constructor(private movieService: MovieService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getMovie(id);
            }
        );
    }

    getMovie(id: number): void {
        this.movieService.getMovie(id)
            .subscribe(
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error);
    }

    onMovieRetrieved(movie: IMovie): void {
        this.movie = movie;
        if (this.movie.id === 0) {
            this.pageTitle = 'Add Movie (Template-driven)';
        } else {
            this.pageTitle = `Edit Movie (Template-driven): ${this.movie.title}`;
        }
    }

    saveMovie(editForm: NgForm): void {
        console.log(editForm);
        if (editForm.dirty && editForm.valid) {
            alert(`Movie: ${JSON.stringify(editForm.value)}`);
        }
    }
}
