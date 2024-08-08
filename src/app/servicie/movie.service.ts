import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieResult } from '../type/movies.type';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
   /**
   * URL base para las solicitudes relacionadas con películas.
   * Se obtiene de la configuración del entorno.
   */
   private url = environment.url_movie;

   /**
    * Clave de API para acceder al servicio de películas.
    * Se obtiene de la configuración del entorno.
    */
   private api = environment.api_movie;
 
   /**
    * Token de autenticación para el servicio de películas.
    * Se obtiene de la configuración del entorno.
    */
   private token = environment.token_movie;
 
   /**
    * Lista de películas marcadas como favoritas.
    * Inicialmente se carga desde el almacenamiento local, o se establece como una lista vacía.
    */
   favorites: Movie[] = [];
 
   /**
    * Constructor del servicio que inyecta el `HttpClient`.
    * Carga las películas favoritas desde el almacenamiento local.
    * @param http - Cliente HTTP para hacer solicitudes a la API.
    */
   constructor(private http: HttpClient) {
     const storedFavorites = localStorage.getItem('favorites');
     this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
   }
 
   /**
    * Obtiene una lista de películas populares.
    * @param page - Número de la página a recuperar. Se establece en 1 por defecto.
    * @returns Un observable que emite el resultado de la solicitud con la lista de películas.
    */
   findMovies(page: number = 1) : Observable<MovieResult>{
     return this.http.get<MovieResult>(`${this.url}/movie/popular?api_key=${this.api}&language=es-ES&page=${page}`);
   }
 
   /**
    * Obtiene los detalles de una película específica por su ID.
    * @param id - ID de la película a recuperar.
    * @returns Un observable que emite el resultado de la solicitud con los detalles de la película.
    */
   findOneMovie(id: string) : Observable <Movie>{
     return this.http.get<Movie>(`${this.url}/movie/${id}?api_key=${this.api}&language=es-ES`);
   }
 
   /**
    * Añade una película a la lista de favoritas.
    * Solo añade la película si no está ya en la lista de favoritas.
    * @param movie - La película que se va a añadir a las favoritas.
    */
   addFavorite(movie: any): void {
     if (!this.isFavorite(movie.id)) {
       this.favorites.push(movie);
       this.updateFavoritesInStorage();
     }
   }
 
   /**
    * Verifica si una película ya está en la lista de favoritas.
    * @param movieId - ID de la película a verificar.
    * @returns `true` si la película está en la lista de favoritas, `false` en caso contrario.
    */
   isFavorite(movieId: number): boolean {
     return this.favorites.some(movie => movie.id === movieId);
   }
 
   /**
    * Elimina una película de la lista de favoritas.
    * @param movieId - ID de la película a eliminar.
    */
   removeFavorite(movieId: number): void {
     this.favorites = this.favorites.filter(movie => movie.id !== movieId);
     this.updateFavoritesInStorage();
   }
 
   /**
    * Elimina todas las películas de la lista de favoritas del almacenamiento local.
    */
   clearFavorite(): void {
     localStorage.removeItem('favorites');
     this.favorites = [];  // Opcionalmente, también se puede limpiar la lista en la memoria.
   }
 
   /**
    * Actualiza la lista de películas favoritas en el almacenamiento local.
    * Convierte la lista de películas a una cadena JSON y la guarda en el almacenamiento local.
    */
   private updateFavoritesInStorage(): void {
     localStorage.setItem('favorites', JSON.stringify(this.favorites));
   }
}
