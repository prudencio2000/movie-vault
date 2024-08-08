import { Component, OnInit } from '@angular/core';
import { environment } from 'environment';
import { MovieService } from 'src/app/servicie/movie.service';
import { Movie } from 'src/app/type/movies.type';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
})
export class FavoriteMoviesComponent implements OnInit{
 /**
   * Lista de películas marcadas como favoritas.
   * Inicialmente se carga desde el servicio de películas.
   */
 favorites: Movie[] = [];

 /**
  * URL base para obtener las imágenes de las películas.
  * Se obtiene de la configuración del entorno.
  */
 urlImgen: string = environment.url_poster;

 /**
  * Término de búsqueda para filtrar las películas favoritas.
  */
 searchTerm: string = '';

 /**
  * Lista de películas favoritas filtradas según el término de búsqueda.
  */
 filteredFavorites: Movie[] = [];

 /**
  * Constructor del componente que inyecta el servicio de películas.
  * @param movieService - Servicio para manejar las películas y favoritas.
  */
 constructor(private movieService: MovieService) {}

 /**
  * Método del ciclo de vida del componente que se ejecuta al inicializarse.
  * Carga las películas favoritas del servicio y establece la lista filtrada.
  */
 ngOnInit(): void {
   this.favorites = this.movieService.favorites;
   this.filteredFavorites = this.favorites;
 }

 /**
  * Elimina una película de la lista de favoritas y actualiza la lista.
  * @param id - ID de la película a eliminar.
  */
 deleteFavorite(id: number): void {
   this.movieService.removeFavorite(id);
   this.favorites = this.movieService.favorites;
   this.filteredFavorites = this.favorites;
 }

 /**
  * Filtra las películas favoritas según el término de búsqueda.
  * Actualiza la lista de películas filtradas.
  */
 filterMovies(): void {
   const term = this.searchTerm.toLowerCase();
   this.filteredFavorites = this.favorites.filter(movie =>
     movie.title.toLowerCase().includes(term) ||
     movie.overview.toLowerCase().includes(term)
   );
 }
}
