import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { movieRoutes, MovieModule } from './movies/movie.module';

// To change to lazy loading:
// 1) Change 'children' to 'loadChildren' below.
// 2) Remove movieRoutes, MovieModule import statement above.
// 3) Remove MovieModule from the imports array below.
// 4) In the movie.module.ts file, in the imports array
//    replace `RouterModule` with `RouterModule.forChild(movieRoutes)

const appRoutes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'movies',
                canActivate: [AuthGuard],
                children: movieRoutes
                // loadChildren: './movies/movie.module#MovieModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        MovieModule,
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
