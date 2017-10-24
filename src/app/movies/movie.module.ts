import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieEditComponent } from './edit/movie-edit.component';
import { MovieEditInfoComponent } from './edit/movie-edit-info.component';
import { MovieEditTagsComponent } from './edit/movie-edit-tags.component';

import { MovieService } from './movie.service';
import { MovieParameterService } from './movie-parameter.service';
import { MovieResolver } from './movie-resolver.service';
import { MovieEditGuard } from './edit/movie-edit-guard.service';
import { MovieSearchComponent } from './search/movie-search.component';
import { MovieEditReactiveComponent } from './edit/movie-edit-reactive.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      { path: 'search', component: MovieSearchComponent },
      {
        path: ':id',
        resolve: { movie: MovieResolver },
        component: MovieDetailComponent
      },
      {
        path: ':id/editReactive',
        resolve: { movie: MovieResolver },
        component: MovieEditReactiveComponent
      },      {
        path: ':id/edit',
        resolve: { movie: MovieResolver },
        canDeactivate: [ MovieEditGuard ],
        component: MovieEditComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: MovieEditInfoComponent },
          { path: 'tags', component: MovieEditTagsComponent }
        ]
      }
    ])
  ],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieEditInfoComponent,
    MovieEditTagsComponent,
    MovieEditReactiveComponent,
    MovieSearchComponent
  ],
  providers: [
    MovieService,
    MovieParameterService,
    MovieResolver,
    MovieEditGuard
  ]
})
export class MovieModule { }
