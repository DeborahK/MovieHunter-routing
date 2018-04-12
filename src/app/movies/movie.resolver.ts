import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Injectable()
export class MovieResolver implements Resolve<IMovie> {

    constructor(private movieService: MovieService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<IMovie> {
        const id = route.paramMap.get('id');
        return this.movieService.getMovie(+id);
    }
}
