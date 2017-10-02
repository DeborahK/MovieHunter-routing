import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    private moviesUrl = './api/movies/movies.json';

    constructor(private http: HttpClient) { }

    getMovies(): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.moviesUrl)
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMovie(id: number): Observable<IMovie> {
        return this.http.get<IMovie[]>(this.moviesUrl)
            .map((movies: IMovie[]) => this.handleMap(movies, id))
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse): ErrorObservable {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        const errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

    private handleMap(movies: IMovie[], id: number): IMovie {
        // Return an initialized object
        if (id === 0) {
            return {
                'id': 0,
                'approvalRating': null,
                'description': '',
                'director': '',
                'imageurl': '',
                'mpaa': '',
                'price': null,
                'releaseDate': '',
                'starRating': null,
                'title': ''
            };
        }
        return movies.find(m => m.id === id);
    }
}
