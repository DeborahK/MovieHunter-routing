import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieEditComponent } from './movie-edit.component';
import { MovieEditInfoComponent } from './movie-edit-info.component';
import { MovieEditTagsComponent } from './movie-edit-tags.component';

import { MovieService } from './movie.service';
import { MovieParameterService } from './movie-parameter.service';
import { MovieResolver } from './movie-resolver.service';
import { MovieEditGuard } from './movie-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      { 
        path: ':id', 
        resolve: { product: MovieResolver },        
        component: MovieDetailComponent 
      },
      {
        path: ':id/edit',
        resolve: { movie: MovieResolver },        
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
    MovieEditTagsComponent
  ],
  providers: [
    MovieService,
    MovieParameterService,
    MovieResolver,
    MovieEditGuard
  ]
})
export class MovieModule { }
