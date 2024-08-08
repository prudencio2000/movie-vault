import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsMoviesComponent } from './details-movies/details-movies.component';
import { DescriptionMovieComponent } from './description-movie/description-movie.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { ChartPopulityMoviesComponent } from './chart-populity-movies/chart-populity-movies.component';
import { TabletPopulityMoviesComponent } from './tablet-populity-movies/tablet-populity-movies.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'movies',
        component: ListComponent
      },
      {
        path: 'desciption/:id',
        component: DescriptionMovieComponent,
      },
      {
        path: 'details',
        component: DetailsMoviesComponent,
      },
      {
        path: 'favorites',
        component: FavoriteMoviesComponent,
      },
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    MoviesComponent,
    ListComponent,
    DetailsMoviesComponent,
    DescriptionMovieComponent,
    FavoriteMoviesComponent,
    ChartPopulityMoviesComponent,
    TabletPopulityMoviesComponent,
    PaginationComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MoviesModule { }
