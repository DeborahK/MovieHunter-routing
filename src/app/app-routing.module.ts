import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

// Feature modules
import { MovieModule } from './movies/movie.module';

// Needed for AoT compiler
// For JIT: () => MovieModule
export function _movieModuleLoader() {
    return MovieModule;
}

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: ShellComponent,
                children: [
                    { path: 'welcome', component: WelcomeComponent },
                    {
                        path: 'movies',
                        loadChildren: _movieModuleLoader,
                        canActivate: [AuthGuard]
                    },
                    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                ]
            },
            { path: '**', component: PageNotFoundComponent }
        ]) // , { enableTracing: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
