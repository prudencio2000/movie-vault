import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/type/movies.type';

@Component({
  selector: 'app-tablet-populity-movies',
  templateUrl: './tablet-populity-movies.component.html',
})
export class TabletPopulityMoviesComponent {
  /**
   * Recibe la peliculas desde el padre
   */
  @Input() movies : Movie [] = []
 
}
