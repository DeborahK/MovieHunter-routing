import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IMovie } from '../movie';
import { MovieService } from '../movie.service';

import { NumberValidators } from '../../shared/number.validator';

@Component({
    templateUrl: './movie-edit-reactive.component.html'
})
export class MovieEditReactiveComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
    editForm: FormGroup;
    formError: { [id: string]: string };
    private validationMessages: { [id: string]: { [id: string]: string } };
    movie: IMovie;
    errorMessage: string;

    constructor(private fb: FormBuilder,
                private movieService: MovieService,
                private router: Router,
                private route: ActivatedRoute) {

        // Without FormBuilder
        // this.editForm = new FormGroup({
        //     title: new FormControl('', [Validators.required,
        //                                 Validators.minLength(3),
        //                                 Validators.maxLength(50)]),
        //     director: new FormControl('', [Validators.required,
        //                                    Validators.minLength(5),
        //                                    Validators.maxLength(50)]),
        //     starRating: new FormControl('', NumberValidators.range(1, 5)),
        //     description: new FormControl('')
        // });

        // With FormBuilder
        this.editForm = this.fb.group({
            'title': ['', [Validators.required,
                           Validators.minLength(3),
                           Validators.maxLength(50)]],
            'director': ['', [Validators.required,
                              Validators.minLength(5),
                              Validators.maxLength(50)]],
            'starRating': ['', NumberValidators.range(1, 5)],
            'description': ['']
        });

        // Watch all of the controls on the form
        this.editForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));

        // Watch one control on the form.
        this.editForm.get('title').valueChanges
                     .subscribe(value => console.log(`Title Changed to: ${value}`));

        // Initialize strings
        this.formError = {
            'title': '',
            'director': '',
            'starRating': '',
            'description': ''
        };

        this.validationMessages = {
            'title': {
                'required': 'Movie title is required',
                'minlength': 'Movie title must be at least three characters.',
                'maxlength': 'Movie title cannot exceed 50 characters.'
            },
            'director': {
                'required': 'Director is required',
                'minlength': 'Director must be at least 5 characters.',
                'maxlength': 'Director cannot exceed 50 characters.'
            },
            'starRating': {
                'range': 'Rate the movie between 1 (lowest) and 5 (highest).'
            }
        };
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
        this.movieService.getMovie(id).subscribe(
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error
        );
    }

    onMovieRetrieved(movie: IMovie): void {
        if (this.editForm) {
            this.editForm.reset();
        }
        this.movie = movie;

        if (this.movie.id === 0) {
            this.pageTitle = 'Add Movie (Reactive)';
        } else {
            this.pageTitle = `Edit Movie (Reactive): ${this.movie.title}`;
        }

        // Update the data on the form
        this.editForm.patchValue({
            title: this.movie.title,
            director: this.movie.director,
            starRating: this.movie.starRating,
            description: this.movie.description
        });
    }

    // Start of a generic validator
    onValueChanged(data: any): void {
        Object.keys(this.formError).forEach(field => {
            const hasError = this.editForm.get(field).dirty &&
                !this.editForm.get(field).valid;
            this.formError[field] = '';
            if (hasError) {
                Object.keys(this.editForm.get(field).errors).forEach(key =>
                        this.formError[field] += this.validationMessages[field][key] + ' '
                );
            }
        });
    }

    saveMovie(): void {
        console.log(this.editForm);
        if (this.editForm.dirty && this.editForm.valid) {
            // Copy the form values over the object values
            const m = Object.assign({}, this.movie, this.editForm.value);

            this.movieService.saveMovie(m).subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
        } else if (!this.editForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editForm.reset();
        this.router.navigate(['/movies']);
    }
}
