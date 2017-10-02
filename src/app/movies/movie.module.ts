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
import { ShellComponent } from '../home/shell.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      { path: ':id', component: MovieDetailComponent },
      {
        path: ':id/edit',
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
    MovieParameterService
  ]
})
export class MovieModule { }
