import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    pageTitle: string = 'Movie Detail';
    movie: IMovie;
    errorMessage: string;

    constructor(private movieService: MovieService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getMovie(id);
    }

    getMovie(id: number): void {
        this.movieService.getMovie(id)
            .subscribe(
                (movie: IMovie) => this.movie = movie,
                (error: any) => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/movies']);
    }
}
