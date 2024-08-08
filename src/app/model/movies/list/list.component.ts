import { Component, OnInit } from '@angular/core';
import { environment } from 'environment';
import { MovieService } from 'src/app/servicie/movie.service';
import { Movie } from 'src/app/type/movies.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /**
  * Lista de películas a mostrar.
  * Inicialmente vacío.
  */
  movies: Movie[] = [];

  /**
   * URL base para las imágenes de los pósteres de las películas.
   * Se obtiene de la configuración del entorno.
   */
  urlImgen: string = environment.url_poster;

  /**
   * Número de la página actual en la paginación.
   * Se establece a 1 por defecto.
   */
  currentPage: number = 1;

  /**
   * Número total de páginas disponibles.
   * Se establece a 1 por defecto.
   */
  totalPages: number = 1;

  /**
   * Constructor del componente que inyecta el servicio de películas.
   * @param movieService - Servicio para manejar las solicitudes relacionadas con las películas.
   */
  constructor(private movieService: MovieService) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama al método `loadMovies` para cargar la primera página de películas.
   */
  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Método para manejar el cambio de página en la paginación.
   * Actualiza la página actual y vuelve a cargar las películas.
   * @param page - Número de la página a la que se desea cambiar.
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  /**
   * Método para cargar las películas desde el servicio.
   * Actualiza la lista de películas y la información de paginación.
   * Maneja errores en caso de fallos en la solicitud.
   */
  loadMovies(): void {
    this.movieService.findMovies(this.currentPage).subscribe({
      next: movieResult => {
        this.movies = movieResult.results;  
        this.totalPages = movieResult.total_pages; 
        this.currentPage = movieResult.page;  
      },
      error: (err) => {
        console.error('Error fetching movies', err);  // Maneja errores en caso de fallo en la solicitud
      }
    });
  }
}