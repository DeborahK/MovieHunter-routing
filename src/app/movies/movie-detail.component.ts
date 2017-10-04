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
        this.movie = this.route.snapshot.data['movie'];
    }

    onBack(): void {
        this.router.navigate(['/movies']);
    }
}
