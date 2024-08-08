import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/servicie/movie.service';
import { Movie } from 'src/app/type/movies.type';

@Component({
  selector: 'app-details-movies',
  templateUrl: './details-movies.component.html',
  styleUrls: ['./details-movies.component.scss']
})
export class DetailsMoviesComponent implements OnInit{
  /**
   * Lista de películas obtenidas desde el servicio de películas.
   * Esta lista se usa para construir gráficos y mostrar detalles.
   */
  datosMovies: Movie[] = [];

  /**
   * Categorías para el gráfico. En este caso, es una lista de títulos de películas.
   */
  chart_cotegory: string[] = [];

  /**
   * Valores para el gráfico. En este caso, es una lista de popularidades de las películas.
   * Se asegura de que el valor sea 0 si es undefined.
   */
  chart_value: number[] = [];

  /**
   * Constructor del componente que inyecta el servicio de películas.
   * @param movieService - Servicio para manejar las películas.
   */
  constructor(private movieService: MovieService) {}

  /**
   * Método del ciclo de vida del componente que se ejecuta al inicializarse.
   * Obtiene la lista de películas del servicio y extrae los datos necesarios para los gráficos.
   */
  ngOnInit(): void {
    this.movieService.findMovies().subscribe({
      next: data => {
        this.datosMovies = data.results;
        this.chart_cotegory = this.datosMovies.map(item => item.title);
        this.chart_value = this.datosMovies.map(item => item.popularity ?? 0);
      },
      error: (err) => {
        console.error('Error fetching movies', err); 
      }
    });
  }
}
