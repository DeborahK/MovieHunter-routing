import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap, map } from 'rxjs/operators';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    private moviesUrl = 'api/movies';

    constructor(private http: HttpClient) { }

    getMovies(): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.moviesUrl)
                        .pipe(
                            tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getMovie(id: number): Observable<IMovie> {
        if (id === 0) {
            return of(this.initializeMovie());
        }
        const url = `${this.moviesUrl}/${id}`;
        return this.http.get<IMovie>(url)
                        .pipe(
                            tap(data => console.log('Data: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
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
                'title': '',
                'category': '',
                'tags': []
            };
        }
        return movies.find(m => m.id === id);
    }

    deleteMovie(id: number): Observable<Response> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const url = `${this.moviesUrl}/${id}`;
        return this.http.delete<IMovie>(url, { headers: headers} )
                        .pipe(
                            tap(data => console.log('deleteMovie: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    saveMovie(movie: IMovie): Observable<IMovie> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (movie.id === 0) {
            return this.createMovie(movie, headers);
        }
        return this.updateMovie(movie, headers);
    }

    private createMovie(movie: IMovie, headers: HttpHeaders): Observable<IMovie> {
        movie.id = undefined;
        return this.http.post<IMovie>(this.moviesUrl, movie,  { headers: headers} )
                        .pipe(
                            tap(data => console.log('createMovie: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    private initializeMovie(): IMovie {
        // Return an initialized object
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
            'title': '',
            'category': '',
            'tags': []
        };
    }

    private updateMovie(movie: IMovie, headers: HttpHeaders): Observable<IMovie> {
        const url = `${this.moviesUrl}/${movie.id}`;
        return this.http.put<IMovie>(url, movie, { headers: headers} )
                        .pipe(
                            tap(data => console.log('updateMovie: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }
}
