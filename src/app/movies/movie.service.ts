import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'api/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMovie(id: number): Observable<Movie> {
    if (id === 0) {
      return of(this.initializeMovie());
    }
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url)
      .pipe(
        tap(data => console.log('Data: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  saveMovie(movie: Movie): Observable<Movie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (movie.id === 0) {
      return this.createMovie(movie, headers);
    }
    return this.updateMovie(movie, headers);
  }

  deleteMovie(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<Movie>(url, { headers })
      .pipe(
        tap(data => console.log('deleteMovie: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private createMovie(movie: Movie, headers: HttpHeaders): Observable<Movie> {
    movie.id = null;
    return this.http.post<Movie>(this.moviesUrl, movie, { headers })
      .pipe(
        tap(data => console.log('createMovie: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private updateMovie(movie: Movie, headers: HttpHeaders): Observable<Movie> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put<Movie>(url, movie, { headers })
      .pipe(
        tap(data => console.log('updateMovie: ' + movie.id)),
        catchError(this.handleError)
      );
  }

  private initializeMovie(): Movie {
    // Return an initialized object
    return {
      id: 0,
      approvalRating: null,
      description: '',
      director: '',
      imageurl: '',
      mpaa: '',
      price: null,
      releaseDate: '',
      starRating: null,
      title: '',
      category: '',
      tags: []
    };
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
