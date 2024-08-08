import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environment';
import { MovieService } from 'src/app/servicie/movie.service';
import { Movie } from 'src/app/type/movies.type';

@Component({
  selector: 'app-description-movie',
  templateUrl: './description-movie.component.html',
})
export class DescriptionMovieComponent implements OnInit {
   /**
   * URL base para las imágenes de las películas.
   * Se obtiene del archivo de configuración del entorno.
   */
   urlImgen: string = environment.url_poster;

   /**
    * Objeto que contiene los detalles de la película actual.
    * Puede ser un objeto `Movie` o `undefined` si los datos aún no se han cargado.
    */
   movieData: Movie | undefined = undefined;
 
   /**
    * Constructor del componente.
    * @param movieService - Servicio para manejar las películas, incluyendo favoritos.
    * @param route - Servicio para acceder a la información de la ruta activa, usado para obtener el ID de la película.
    */
   constructor(private movieService: MovieService, private route: ActivatedRoute) { }
 
   /**
    * Método del ciclo de vida del componente que se ejecuta al inicializarse.
    * Obtiene el ID de la película de los parámetros de la ruta, y luego carga los detalles de la película desde el servicio.
    */
   ngOnInit(): void {
     let id: any = this.route.snapshot.paramMap.get('id');
     this.movieService.findOneMovie(id).subscribe({
       next: movie => {
         this.movieData = movie;
       },
       error: (err) => {
         console.error('Error fetching movie details', err); 
       }
     });
   }
 
   /**
    * Método para guardar o eliminar una película de la lista de favoritos.
    * Si la película ya está en favoritos, se elimina; de lo contrario, se agrega.
    * @param movie - Objeto `Movie` que se va a agregar o eliminar de la lista de favoritos.
    */
   saveMovie(movie: any): void {

     if (this.movieService.isFavorite(movie.id)) {
       this.movieService.removeFavorite(movie.id);
     } else {
       this.movieService.addFavorite(movie);
     }
   }
}
