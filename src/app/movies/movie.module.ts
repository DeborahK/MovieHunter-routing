import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieEditComponent } from './movie-edit.component';
import { MovieEditReactiveComponent } from './movie-edit-reactive.component';

import { MovieService } from './movie.service';
import { MovieParameterService } from './movie-parameter.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/:id', component: MovieDetailComponent },
      { path: 'movies/:id/edit', component: MovieEditComponent },
      { path: 'movies/:id/editReactive', component: MovieEditReactiveComponent }
    ])
  ],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieEditReactiveComponent
  ],
  providers: [
    MovieService,
    MovieParameterService
  ]
})
export class MovieModule {}
